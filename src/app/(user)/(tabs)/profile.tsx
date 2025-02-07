import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import {HomeStyles as S} from '@/styles/home';
import AccordionList from '@components/AccordionList';
import Header from '@/components/Header';
import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, List, Text} from 'react-native-paper';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {Button} from 'react-native-paper';

import {useAuth} from '@/providers/AuthProvider';
import {Colors} from '@constants/Colors';
import React, {useState} from 'react';

import AutocompleteTextInput from '@components/AutoCompleteTextInput';

import {useProfileStyles} from '@styles/profile';

const ProfileDataField = ({label, value}: {label: string; value: string}) => {
  const styles = useProfileStyles();
  return (
    <View style={styles.profileDataFieldContainer}>
      <Text style={styles.dataFieldLabel}>{label}</Text>
      <Text style={styles.dataFieldValue}>{value}</Text>
    </View>
  );
};

const UserPictureComponent = ({
  name,
  picture,
}: {
  name: string;
  picture: string;
}) => {
  const styles = useProfileStyles();
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profilePictureContainer}>
        <MaterialCommunityIcons
          name="account-circle"
          size={150}
          color="black"
        />
        <View style={styles.nameRow}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

const agencies = [
  {label: 'bUCR', value: 1},
  {label: 'TSG', value: 2},
  {label: 'Transtusa', value: 3},
];
const vehicles = ['SJB1234', 'SJB5678'];

const ProfileScreen = () => {
  const [agency, setAgency] = useState<number | null>();
  const [vehicle, setVehicle] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const {user, operator, logOut} = useAuth();
  const styles = useProfileStyles();

  const name = `${user?.first_name} ${user?.last_name}`;

  if (!user || !operator) {
    return <ActivityIndicator />;
  }

  //  TODO: Changes in user.
  const handleConfirmChanges = () => {
    if (agency && vehicle && vehicle.trim() !== '' && !error) {
      console.log('Changes in user');
    } else {
      console.log('There are no changes');
    }
  };

  const handleSelectAgency = (value: number) => {
    setAgency(value);
  };

  const handleSelectVehicle = (text: string) => {
    console.log('Vehicle changed: ', text);

    setVehicle(text);
  };

  const handleErrorChange = (hasError: boolean) => {
    setError(hasError);
  };

  console.log(`Agency: ${agency} | Vehicle: ${vehicle} | Error: ${error}`);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Header pageTitle="Perfil" variant="3" />
        <View style={styles.square} />

        <UserPictureComponent name={name} picture="" />

        <View style={styles.contentContainer}>
          <View style={styles.profileDataContainer}>
            <ProfileDataField label="Cédula" value={user?.operator_id} />
            <ProfileDataField label="Teléfono" value={operator?.phone} />
          </View>

          {/* TODO: changed agencies, and vehicles for actual values from API */}
          <View style={styles.inputContainer}>
            <AccordionList
              items={agencies}
              defaultLabel="Agencia"
              onSelect={handleSelectAgency}
            />
            <AutocompleteTextInput
              label="Vehículo"
              suggestions={vehicles}
              disabled={!agency}
              onChangeText={handleSelectVehicle}
              onErrorChange={handleErrorChange}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonConfirmChanges}
            onPress={handleConfirmChanges}
            disabled={error || (vehicle !== null && vehicle.trim() === '')}
          >
            <Text style={styles.buttonText}>Confirmar Cambios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonLogOut} onPress={logOut}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;
