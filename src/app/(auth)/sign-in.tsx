import {
  Alert,
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
import {useRef, useState} from 'react';

const validUsername = 'user';
const validPassword = 'secret';

const LogInScreen = () => {
  const styles = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const usernameInputRef = useRef<TextInput>(null);

  async function signInWithUsername() {
    setLoading(true);
    if (!validateInput()) {
      setLoading(false);
      return;
    }

    // TODO: Sign In with API
    if (username === validUsername && password === password) {
      console.log("Signed In");
      router.push('/');
    } else {
      Alert.alert('Usuario o contraseña incorrectos');
    }

    setLoading(false);
    resetFields();
  }

  const resetFields = () => {
    setUsername('');
    setPassword('');
  };

  const validateInput = () => {
    setError('');
    if (!username) {
      setError('Se requiere el usuario');
      return false;
    }
    if (!password) {
      setError('Se requiere la constraseña');
      return false;
    }
    return true;
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
          label="Usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          secureTextEntry={!isPasswordVisible}
          label="Contraseña"
          value={password}
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye-off' : 'eye'}
              onPress={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
              style={styles.inputIcon}
            />
          }
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
        />

        <Text style={{marginTop: 10, color: 'red', fontWeight: '500'}}>{error}</Text>
        <Button
          style={styles.button}
          mode="contained"
          disabled={loading}
          onPress={signInWithUsername}
          labelStyle={styles.buttonText}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </Button>

        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>¿No tienes acceso?</Text>
          <Divider style={styles.divider} />
        </View>

        {/* TODO: navigate the user to place where they can start the process of asking for an account. */}
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
