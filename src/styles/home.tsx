import {StyleSheet, useColorScheme} from 'react-native';
import {Colors} from '@constants/Colors';

export const useHomeStyles = () => {
  const colorScheme = useColorScheme() as 'light' | 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].background,
      alignItems: 'center',
      // justifyContent: 'center',
      alignContent: 'center',
    },
    content: {
      flex: 1,
      position: 'absolute', // Puts it behind everything
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center', // Centers vertically
      alignItems: 'center', // Centers horizontally
      // backgroundColor: 'rgba(0,0,255,0.2)', // Light transparent blue
      zIndex: 0, // Keeps it in the background
    },

    description: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: '#005DA4',
      fontWeight: 'bold',
      marginTop: 24,
    },

    button: {
      width: '40%',
      height: '8%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginTop: 'auto',
      marginRight: 15,
      marginBottom: 15,
      backgroundColor: Colors.secondaryColor,
      borderRadius: 16,
      gap: 16,
    },

    buttonText: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: '#FFFBFB',
      fontWeight: 'bold',
    },
  });
};
