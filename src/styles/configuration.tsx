import {Platform, StyleSheet} from 'react-native';
import {useColorScheme} from '@hooks/useColorScheme';

import {Colors} from '@constants/Colors';

export const useConfigurationStyles = () => {
  const colorScheme = useColorScheme() as 'light' | 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      backgroundColor: Colors[colorScheme].background,
      paddingTop: 48,
      paddingHorizontal: 24,
    },

    formText: {
      fontFamily: 'Roboto',
      fontSize: 20,
      color: Colors[colorScheme].text,
      fontWeight: 'bold',
      marginBottom: 16,
    },

    formContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    },

    input: {
      width: '100%',
    },

    tripContainer: {
      gap: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 'auto',
    },

    tripListContainer: {
      width: '95%',
      height: '45%',
      marginBottom: 10,
      marginTop: 50,
      ...Platform.select({
        ios: {
          shadowColor: Colors[colorScheme].text,
          shadowOffset: {width: 0, height: 4},  
          shadowOpacity: 0.25,
          shadowRadius: colorScheme === 'light' ? 4 : 2,
        },
        android: {
          elevation: 5, // Shadow for Android
        },
      }),
    },
  });
};
