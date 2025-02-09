import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import {Tabs} from 'expo-router';
import {useColorScheme} from 'react-native';

import {Colors} from '@constants/Colors';

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {borderTopWidth: 1, borderTopColor: Colors.primaryColor},
      }}
    >
      <Tabs.Screen name="index" options={{href: null}} />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="configuration"
        options={{
          title: 'Nuevo Viaje',
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name={focused ? 'bus-sharp' : 'bus-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({color, focused}) => (
            <MaterialIcons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
