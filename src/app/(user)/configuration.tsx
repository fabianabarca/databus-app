import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ConfigurationStyles as S} from '@/src/styles/configuration';
import Header from '@/components/Header';
import {StatusBar} from 'expo-status-bar';
import {Text} from 'react-native-paper';
import {Link, useRouter} from 'expo-router';

import {TextInput} from 'react-native-paper';
import AutoCompleteTextInput from '@/components/AutoCompleteTextInput';

const Configuration = () => {
  const router = useRouter();
  const suggestions = ['bUCR1 L1', 'bUCR1 L2'];

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={S.container}>
        <StatusBar style="light" />
        <Header
          driverName="Fabián"
          variant="2"
          hasBackButton
          onButtonClick={() => router.push('/')}
          pageTitle="Configuración del viaje"
        />

        <View style={S.content}>
          {/* Form title and container */}
          <Text style={S.formText}>Datos del viaje</Text>
          <View style={S.formContainer}>
            <AutoCompleteTextInput label="Ruta" suggestions={suggestions} />
            <TextInput label="Recorrido" style={S.input} mode="outlined" />
          </View>
        </View>

        <Link href="/trip" asChild>
          <TouchableOpacity style={S.startTripButton}>
            <Text style={S.buttonText}>Comenzar viaje</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Configuration;
