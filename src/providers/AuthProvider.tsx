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
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Refactor to fetch user info on useEffect, and replace session boolean.
type AuthData = {
  user: User | null;
  operator: Operator | null;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: (resetAppData: () => Promise<void>) => Promise<void>;
  loading: boolean;
  session: boolean;
};

const AuthContext = createContext<AuthData>({
  user: null,
  operator: null,
  logIn: async () => {},
  logOut: async () => {},
  loading: true,
  session: false,
});

export default function AuthProvider({children}: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(false);

  // Load stored token and user data
  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);

      const {token, operator_id, first_name, last_name} =
        await loadSessionFromStorage();

      if (token && token !== 'null' && operator_id && operator_id !== 'null') {
        setUser({
          first_name: first_name ?? '',
          last_name: last_name ?? '',
          operator_id,
        });
        setSession(true);

        if (!operator) {
          const newOperator = await api.get<Operator>(
            `operator/${operator_id}/`,
          );
          setOperator(newOperator ?? null);
        }
      }
      setLoading(false);
    };
    loadSession();
  }, []);

  // Sign in function
  const logIn = async (username: string, password: string) => {
    try {
      const response = await api.logIn(username, password);
      const {first_name, last_name, operator_id, token} = response;
      console.log(response);

      // Store in SecureStore
      await SecureStore.setItemAsync('operator_id', operator_id);
      await api.setAuthToken(token);

      // Store non-sensitive data
      await AsyncStorage.setItem('first_name', first_name);
      await AsyncStorage.setItem('last_name', last_name);

      // Fetch and save opeartor
      const operatorResponse = await api.get<Operator>(
        `operator/${operator_id}/`,
      );

      console.log('Response operator: ', operatorResponse);

      setUser({first_name, last_name, operator_id});
      setOperator(operatorResponse);
      setSession(true);
    } catch (error: any) {
      throw error;
    }
  };

  // Sign out function
  const logOut = async (resetAppData: () => Promise<void>) => {
    console.log('Logging out');

    await SecureStore.deleteItemAsync('user');
    await AsyncStorage.removeItem('first_name');
    await AsyncStorage.removeItem('last_name');
    await api.clearAuthToken();

    setUser(null);
    setOperator(null);
    setSession(false);

    await resetAppData();
    console.log('logged out');
  };

  return (
    <AuthContext.Provider
      value={{user, operator, logIn, logOut, loading, session}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

async function loadSessionFromStorage(): Promise<{
  token: string | null;
  operator_id: string | null;
  first_name: string | null;
  last_name: string | null;
}> {
  try {
    const token = await api.loadToken();
    const operator_id = await SecureStore.getItemAsync('operator_id');
    const first_name = await AsyncStorage.getItem('first_name');
    const last_name = await AsyncStorage.getItem('last_name');

    return {token, operator_id, first_name, last_name};
  } catch (error) {
    return {token: null, operator_id: null, first_name: null, last_name: null};
  }
}
