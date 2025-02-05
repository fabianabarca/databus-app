import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import {Operator, User} from '@/types';
import {api} from '@/api/api-client';

// TODO: Refactor to fetch user info on useEffect, and replace session boolean.
type AuthData = {
  user: User | null;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  loading: boolean;
  session: boolean;
};

const AuthContext = createContext<AuthData>({
  user: null,
  logIn: async () => {},
  logOut: async () => {},
  loading: true,
  session: false,
});

export default function AuthProvider({children}: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(false);

  // Load stored token and user data
  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);
      const storedUser = await SecureStore.getItemAsync('user');
      const token = await SecureStore.getItemAsync('authToken');
      if (
        token &&
        token !== 'null' &&
        storedUser &&
        storedUser !== 'null' &&
        !user
      ) {
        const parsedUser: User = JSON.parse(storedUser as string) as User;
        if (parsedUser) {
          setUser(() => {
            const newUser = parsedUser;
            setSession(newUser !== null);
            setLoading(false);
            return newUser;
          });
        }
      }
    };
    loadSession();
  }, []);

  // Sign in function
  const logIn = async (username: string, password: string) => {
    try {
      const response = await api.logIn(username, password);
      const {first_name, last_name, operator_id, token} = response;

      // Store in SecureStore
      await SecureStore.setItemAsync('authToken', token);
      await SecureStore.setItemAsync(
        'user',
        JSON.stringify({first_name, last_name, operator_id}),
      );

      // Set in state
      setUser({first_name, last_name, operator_id});
      // console.log('User: ', user);

      setSession(true);
    } catch (error: any) {
      throw error;
    }
  };

  // Sign out function
  const logOut = async () => {
    // Remove from SecureStore
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('user');

    // Clear state
    setUser(null);
    setSession(false);
  };

  return (
    <AuthContext.Provider value={{user, logIn, logOut, loading, session}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
