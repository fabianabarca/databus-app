import {View} from 'react-native';
import {Stack} from 'expo-router';

export default function StackLayout() {
  return (
    <View>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="configuration" />
        <Stack.Screen name="trip" />
      </Stack>
    </View>
  );
}
