// import {useAuth} from '@providers/AuthProvider';
import {useAuth} from '@/src/providers/AuthProvider';
import {Redirect, Stack} from 'expo-router';
import {ActivityIndicator} from 'react-native-paper';

export default function AuthLayout() {
  const {loading, session} = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (session) {
    return <Redirect href={'/'} />;
  }

  return <Stack />;
}
