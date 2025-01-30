import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors} from '@constants/Colors';
import {useColorScheme} from '@hooks/useColorScheme';

import {Link, Stack} from 'expo-router';
import {Button, Divider, TextInput} from 'react-native-paper';

const LogInScreen = () => {
  const styles = useStyles();

  const singIn = () => {
    console.log('Signing in...');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.backgroundContainer}>
        <Stack.Screen options={{headerShown: false}} />

        <Image
          source={require('@assets/images/splash.png')}
          style={styles.logo}
        />

        <Text style={styles.text}>Ingrese a la cuenta de conductor</Text>
        <TextInput
          label="Correo electrónico"
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          secureTextEntry
          label="Contraseña"
          style={styles.input}
          mode="outlined"
          right={<TextInput.Icon icon="eye" style={styles.inputIcon} />}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={singIn}
          labelStyle={styles.buttonText}
        >
          Ingresar
        </Button>

        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>¿No tienes acceso?</Text>
          <Divider style={styles.divider} />
        </View>

        <Link href={'/'}>
          <Text style={styles.linkText}>Solcitar Cuenta</Text>
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LogInScreen;

const useStyles = () => {
  const colorScheme = useColorScheme() as 'light' | 'dark';

  return StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      backgroundColor: Colors[colorScheme].primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
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
      width: 348,
      height: 56,
      padding: 8,
      backgroundColor: Colors[colorScheme].background,
      borderRadius: 10,
      marginTop: 10,
    },
    inputIcon: {
      marginTop: 20,
    },
    button: {
      width: 348,
      height: 56,
      marginTop: 10,
      backgroundColor: '#6DC067',
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
  });
};
