import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import {Operator} from '@/types';
import {Api} from '@/api/api-client';

type AuthData = {
  user: Operator | null;
  // token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({
  user: null,
  // token: null,
  signIn: async () => {},
  signOut: async () => {},
  loading: true,
});

export default function AuthProvider({children}: PropsWithChildren) {
  const [user, setUser] = useState<any | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  // const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load stored token and user data
  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);
      // const storedToken = await SecureStore.getItemAsync('authToken');
      const storedUser = await SecureStore.getItemAsync('userId');
      if (storedUser) {
        // setToken(storedToken);
        setUserId(userId);
        // Fetch user details if needed
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    const response = await Api.getInstance().signIn(email, password);
    const {token, user_id} = response;

    // setToken(token);
    setUser(user);
    // api.defaults.headers.Authorization = `Bearer ${token}`;

    // Store in SecureStore
    await SecureStore.setItemAsync('authToken', token);
    await SecureStore.setItemAsync('userId', user_id);

    // Set in state
    setUserId(user_id);
  };

  // Sign out function
  const signOut = async () => {
    // Remove from SecureStore
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('userId');

    // Clear state
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
