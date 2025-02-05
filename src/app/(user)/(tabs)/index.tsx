import {Redirect} from 'expo-router';

export default function TabIndex() {
  console.log('Going to home from tab');

  return <Redirect href={'/(user)/(tabs)/home'} />;
}
