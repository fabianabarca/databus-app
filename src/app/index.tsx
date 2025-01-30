import {Redirect} from 'expo-router';
import {View, Text} from 'react-native';

const index = () => {
  // const {session, loading} = useAuth();
  const session = false;

  if (!session) {
    console.log();
    
    return <Redirect href={'/sign-in'} />;
  }

  // return <Redirect href={'/(user)'} />;
  return (
    <View>
      <Text> This is an eror</Text>
    </View>
  );
};

export default index;