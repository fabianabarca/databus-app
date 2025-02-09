import {StyleSheet, useColorScheme} from 'react-native';
import {Colors} from '@constants/Colors';

export const useLogInStyles = () => {
  const colorScheme = useColorScheme() as 'light' | 'dark';

  return StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      backgroundColor: Colors[colorScheme].primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInputContainer: {
      width: '90%',
      height: 70,
      minWidth: 60,
      minHeight: 60,
      margin: 15,
    },
    logo: {
      // marginTop: 40,
      marginBottom: 100,
      width: 249,
      height: 64,
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    },
    dividerContainer: {
      width: 348,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    input: {
      height: 70,
    },
    button: {
      width: '90%',
      height: 56,
      marginTop: 40,
      backgroundColor: Colors.secondaryColor,
      borderRadius: 6,
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    divider: {
      flex: 1,
      height: 0.5,
      backgroundColor: 'white',
    },
    dividerText: {
      marginHorizontal: 10,
      color: 'white',
    },
    linkText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    error: {
      color: 'red',
      fontWeight: '500',
    },
  });
};
