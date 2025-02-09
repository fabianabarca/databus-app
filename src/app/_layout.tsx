import {DarkTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@hooks/useColorScheme';
import {PaperProvider, DefaultTheme, configureFonts} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import {Colors} from '@constants/Colors';
import AuthProvider from '../providers/AuthProvider';
import AppDataProvider from '../providers/AppDataProvider';

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

  const fontConfig = {
    regular: {
      fontFamily: 'Roboto',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
    },
    light: {
      fontFamily: 'Roboto-Light',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
    },
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors[colorScheme].primaryColor,
      secondary: Colors.secondaryColor,
      background: Colors[colorScheme].card,
      text: Colors[colorScheme].text,
    },
    fonts: configureFonts({config: fontConfig}),
  };

  return (
    <ThemeProvider value={theme}>
      <StatusBar style="light" />
      <PaperProvider theme={theme}>
        <AuthProvider>
          <AppDataProvider>
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
          </AppDataProvider>
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
