import {Redirect} from 'expo-router';
import {View, Text} from 'react-native';
import {useAuth} from '@providers/AuthProvider';
import {ActivityIndicator} from 'react-native-paper';

const index = () => {
  const {loading, session} = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={'/log-in'} />;
  }

  return <Redirect href={'/(user)'} />;
};

export default index;
