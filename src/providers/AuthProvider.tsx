import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import {Operator} from '@/types';
import {api} from '@/api/api-client';
import {longPressGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler';
import {logToLogBoxAndConsole} from 'react-native-reanimated/lib/typescript/logger';

const testUserId = '1-1234-5678';

// TODO: Refactor to fetch user info on useEffect, and replace session boolean.
type AuthData = {
  user: Operator | null;
  // token: string | null;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  loading: boolean;
  session: boolean;
};

const AuthContext = createContext<AuthData>({
  user: null,
  // token: null,
  logIn: async () => {},
  logOut: async () => {},
  loading: true,
  session: false,
});

export default function AuthProvider({children}: PropsWithChildren) {
  const [user, setUser] = useState<any | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  // const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(true);

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
      // TODO: remove when the userId is sorted out propperly
      setLoading(false);
    };
    loadSession();
  }, []);

  // Sign in function
  const logIn = async (username: string, password: string) => {
    let response: {token: string} = {token: ''};
    try {
      response = await api.logIn(username, password);
      console.log('Response: ', response);

      // const {token, user_id} = response;
      const {token} = response;
      setSession(true);

      // setUser(user);

      // Store in SecureStore
      await SecureStore.setItemAsync('authToken', token);
      await SecureStore.setItemAsync('userId', testUserId);


      const test = await api.get<any>(`operator/${testUserId}/`);
      // Set in state
      // setUserId(user_id);
    } catch (error: any) {
      throw error;
    }
  };

  // Sign out function
  const logOut = async () => {
    // Remove from SecureStore
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('userId');

    // Clear state
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{user, logIn, logOut, loading, session}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
