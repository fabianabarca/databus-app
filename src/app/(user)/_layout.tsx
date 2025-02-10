import {View} from 'react-native';
import {Redirect, Stack, Tabs} from 'expo-router';
import {useAuth} from '@/src/providers/AuthProvider';
import {ActivityIndicator} from 'react-native-paper';
import {useAppData} from '@/src/providers/AppDataProvider';

export default function ScreenLayout() {
  const {loading, session} = useAuth();
  const {loading: isDataLoading} = useAppData();

  if (loading || isDataLoading) {
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
