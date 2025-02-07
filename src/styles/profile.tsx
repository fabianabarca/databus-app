import {StyleSheet} from 'react-native';
import {useColorScheme} from '@hooks/useColorScheme';
import {Colors} from '@constants/Colors';

export const useProfileStyles = () => {
  const theme = useColorScheme() as 'light' | 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
      alignItems: 'center',
      paddingBottom: 24,
      zIndex: -1,
    },
    contentContainer: {
      width: '100%',
      height: '100%',
      borderTopRightRadius: 24,
      paddingTop: 125,
      alignItems: 'center',
      backgroundColor: Colors[theme].background,
    },
    profileDataContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 30,
      width: '100%',
      height: 50,
    },
    profileDataFieldContainer: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30%',
    },
    square: {
      position: 'absolute',
      right: 0,
      top: '15%',
      width: 100,
      height: 100,
      backgroundColor: Colors.primaryColor,
      zIndex: 0,
    },
    profileContainer: {
      position: 'absolute',
      top: 0,
      marginTop: 85,
      width: 200,
      height: 170,
      marginHorizontal: 'auto',
      borderRadius: 0,
      zIndex: 5,
      alignContent: 'center',
    },
    profilePictureContainer: {
      width: 150,
      height: undefined,
      aspectRatio: 1,
      borderRadius: 100,
      backgroundColor: Colors.notFocusColor,
      alignSelf: 'center',
    },
    nameText: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      color: Colors[theme].text,
      fontSize: 20,
    },
    nameRow: {
      marginTop: 10,
      width: 200,
    },
    dataFieldLabel: {
      color: Colors.primaryColor,
      fontWeight: 'bold',
      fontSize: 15,
    },
    dataFieldValue: {
      fontSize: 15,
      color: Colors[theme].text,
    },
    buttonConfirmChanges: {
      width: 200,
      height: 56,
      borderRadius: 100,
      backgroundColor: Colors.secondaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
    },
    buttonLogOut: {
      width: 380,
      height: 56,
      borderRadius: 100,
      marginTop: 'auto',
      marginBottom: 150,
      backgroundColor: Colors.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
    },
    inputContainer: {
      width: '90%',
      marginTop: 50,
      gap: 10,
    },
  });
};
