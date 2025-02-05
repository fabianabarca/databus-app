import {View} from 'react-native';
import {Redirect, Stack, Tabs} from 'expo-router';
import {useAuth} from '@/src/providers/AuthProvider';
import {ActivityIndicator} from 'react-native-paper';

export default function TabLayout() {
  const {loading, session} = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={'/(auth)/log-in'} />;
  }

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="trip" options={{title: 'Trip'}} />
    </Stack>
  );
}
