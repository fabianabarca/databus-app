import {StyleSheet, useColorScheme} from 'react-native';
import {Colors} from '@constants/Colors';

export const useHomeStyles = () => {
  const colorScheme = useColorScheme() as 'light' | 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].background,
      alignItems: 'center',
      // justifyContent: "center",
      paddingBottom: 24,
    },
    content: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      backgroundColor: Colors[colorScheme].background,
      paddingTop: 48,
      paddingBottom: 16,
      paddingHorizontal: 24,
    },

    description: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: '#005DA4',
      fontWeight: 'bold',
      marginTop: 24,
    },

    button: {
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: '#6DC067',
      borderRadius: 8,
      gap: 16,
    },

    buttonText: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: '#FAFAFA',
      fontWeight: 'bold',
    },
  });
};
