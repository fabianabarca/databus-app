// import {useAuth} from '@providers/AuthProvider';
import {Redirect, Stack} from 'expo-router';
import {ActivityIndicator} from 'react-native';

export default function AuthLayout() {
  // const {session, loading} = useAuth();

  // if (loading) {
  //   return <ActivityIndicator />;
  // }

  // if (session) {
  //   return <Redirect href={'/'} />;
  // }

  return <Stack />;
}
