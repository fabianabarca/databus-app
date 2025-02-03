import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@hooks/useColorScheme';
import {PaperProvider} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import {Colors} from '@constants/Colors';
import AuthProvider from '../providers/AuthProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const [loaded] = useFonts({
    SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors[colorScheme].primaryColor,
      accent: Colors[colorScheme].tint,
      background: Colors[colorScheme].background,
      text: Colors[colorScheme].text,
    },
    fonts: {
      bodySmall: {
        fontFamily: 'Roboto',
      },
      bodyLarge: {
        fontFamily: 'Roboto',
        color: '#f344',
      },
      labelLarge: {
        fontFamily: 'Roboto',
      },
    },
  };

  return (
    <ThemeProvider value={theme}>
      <StatusBar style="light" />
      <PaperProvider theme={theme}>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#005DA4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false,
            }}
          >
            <Stack.Screen name="(auth)" options={{headerShown: false}} />
            <Stack.Screen name="(user)" options={{headerShown: false}} />
          </Stack>
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
