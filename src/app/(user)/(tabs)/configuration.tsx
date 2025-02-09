import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useConfigurationStyles} from '@/src/styles/configuration';
import Header from '@/components/Header';
import {StatusBar} from 'expo-status-bar';
import {Text} from 'react-native-paper';
import {Link, useRouter} from 'expo-router';

import {TextInput} from 'react-native-paper';
import AutoCompleteTextInput from '@/components/AutoCompleteTextInput';

const Configuration = () => {
  const router = useRouter();
  const suggestions = ['bUCR1 L1', 'bUCR1 L2'];

  const styles = useConfigurationStyles();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Header
          driverName="Fabián"
          variant="2"
          hasBackButton
          onButtonClick={() => router.push('/')}
          pageTitle="Configuración del viaje"
        />

        <View style={styles.content}>
          {/* Form title and container */}
          <Text style={styles.formText}>Datos del viaje</Text>
          <View style={styles.formContainer}>
            <AutoCompleteTextInput label="Ruta" suggestions={suggestions} />
            <TextInput label="Recorrido" style={styles.input} mode="outlined" />
          </View>
        </View>

        <Link href="/trip" asChild>
          <TouchableOpacity style={styles.startTripButton}>
            <Text style={styles.buttonText}>Comenzar viaje</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Configuration;
