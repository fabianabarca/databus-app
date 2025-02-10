import {
  FlatList,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import {useConfigurationStyles} from '@/src/styles/configuration';
import Header from '@/components/Header';
import {StatusBar} from 'expo-status-bar';
import {Text} from 'react-native-paper';
import {Link, useRouter} from 'expo-router';
import {useState} from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import AutoCompleteTextInput from '@/components/AutoCompleteTextInput';
import TripList from '@components/TripList';

const suggestionsRoute = ['bUCR1 L1', 'bUCR1 L2'];
const suggestionsDirection = [
  'Bus interno UCR sin milla',
  'Bus interno UCR con milla',
];

const schedule = [
  {time: '06:00 AM', status: 'delayed'},
  {time: '06:30 AM', status: 'on time'},
  {time: '07:00 AM', status: 'on time'},
  {time: '07:30 AM', status: 'on time'},
  {time: '08:00 AM', status: 'on time'},
  {time: '08:30 AM', status: 'on time'},
  {time: '09:00 AM', status: 'on time'},
];

const Configuration = () => {
  const [route, setRoute] = useState<string | null>(null);
  const [direction, setDirection] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState(schedule[0]);
  const [showTripList, setShowTripList] = useState(false);
  const [error, setError] = useState(false);

  const onSelectDirection = (text: string) => {
    setDirection(text);
    if (text && !error) {
      setShowTripList(true);
    }
  };

  const router = useRouter();

  const styles = useConfigurationStyles();

  // Function to handle item press
  const onSelectItem = async (item: {time: string; status: string}) => {
    console.log('Selected an item: ', item);

    setSelectedItem(item); // Update selected item
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Header
          driverName="Fabián"
          variant="2"
          hasBackButton={false}
          onButtonClick={() => router.push('/')}
          pageTitle="Configuración del viaje"
        />

        <View style={styles.content}>
          {/* Form title and container */}
          <Text style={styles.formText}>Datos del viaje</Text>
          <View style={styles.formContainer}>
            <AutoCompleteTextInput
              label="Ruta"
              suggestions={suggestionsRoute}
              onChangeText={setRoute}
              onErrorChange={setError}
            />
            <AutoCompleteTextInput
              label="Recorrido"
              suggestions={suggestionsDirection}
              onChangeText={onSelectDirection}
              onErrorChange={setError}
              disabled={!route || error}
            />
          </View>
        </View>
        {showTripList && (
          <View style={styles.tripListContainer}>
            <TripList schedule={schedule} onSelect={onSelectItem} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Configuration;
