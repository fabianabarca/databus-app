import {Tabs} from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="index" options={{href: null}} />
      <Tabs.Screen name="home" options={{title: 'Home', headerShown: false}} />
      <Tabs.Screen
        name="configuration"
        options={{title: 'Configuration', headerShown: false}}
      />
      <Tabs.Screen name="profile" options={{title: 'Profile'}} />
    </Tabs>
  );
}
