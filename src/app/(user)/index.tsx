import {Redirect} from 'expo-router';

export default function StackIndex() {
  return <Redirect href={'/(user)/(tabs)/home'} />;
}
