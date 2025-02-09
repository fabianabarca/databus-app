import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Link, Stack, useRouter} from 'expo-router';
import {
  ActivityIndicator,
  Button,
  Divider,
  HelperText,
  TextInput,
} from 'react-native-paper';
import {useState} from 'react';
import {useAuth} from '@providers/AuthProvider';
import {useLogInStyles} from '@styles/log-in';
import {Colors} from '@constants/Colors';
import {useColorScheme} from '@hooks/useColorScheme';

const LogInScreen = () => {
  const styles = useLogInStyles();
  const {logIn} = useAuth();

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userError, setUserError] = useState<string | null>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme() as 'light' | 'dark';

  async function logInWithUsername() {
    setLoading(true);
    if (!validateInput()) {
      setLoading(false);
      return;
    }

    try {
      await logIn(username, password);
      router.replace('/');
    } catch (error: any) {
      console.error('Log in error: ', error);
      Alert.alert(error.message || 'Unknown error occurred.');
    }

    setLoading(false);
    resetFields();
  }

  const resetFields = () => {
    setUsername('');
    setPassword('');
  };

  const validateInput = () => {
    setUserError(null);
    setPasswordError(null);

    let error = false;
    if (!username || username.trim() === '') {
      setUserError('Se requiere el usuario');
      error = true;
    }
    if (!password || password.trim() === '') {
      setPasswordError('Se requiere la constraseña');
      error = true;
    }
    if (error) return false;
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
        <View style={styles.textInputContainer}>
          <TextInput
            label="Usuario"
            value={username}
            onChangeText={text => {
              setUserError(null);
              setUsername(text);
            }}
            style={styles.input}
            mode="outlined"
            error={!!userError}
            textColor={Colors[colorScheme].text}
          />
          {userError && (
            <HelperText type="error" style={styles.error}>
              {userError}
            </HelperText>
          )}
        </View>

        <View style={styles.textInputContainer}>
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
              />
            }
            onChangeText={text => {
              setPasswordError(null);
              setPassword(text);
            }}
            style={styles.input}
            mode="outlined"
            error={!!passwordError}
            textColor={Colors[colorScheme].text}
          />
          {passwordError && (
            <HelperText type="error" style={styles.error}>
              {passwordError}
            </HelperText>
          )}
        </View>

        <Button
          style={styles.button}
          mode="contained"
          disabled={loading}
          onPress={logInWithUsername}
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
