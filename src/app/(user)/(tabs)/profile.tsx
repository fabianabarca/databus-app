import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AccordionList from '@components/AccordionList';
import Header from '@/components/Header';
import {StatusBar} from 'expo-status-bar';
import {Text} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import React, {useEffect, useState} from 'react';

import AutocompleteTextInput from '@components/AutoCompleteTextInput';

import {useProfileStyles} from '@styles/profile';
import {useAuth} from '@providers/AuthProvider';

import {Item} from '@/types';

import {useAppData} from '@providers/AppDataProvider';

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
  const [agencyId, setAgencyId] = useState<number | null>(null);
  const [agencyLabel, setAgencyLabel] = useState<string | null>(null);
  const [vehicleId, setVehicleId] = useState<string | null>(null);

  const [error, setError] = useState(false);

  const {user, operator, logOut} = useAuth();
  const {agency, vehicle, setAgency, setVehicle, resetAppData} = useAppData();

  const styles = useProfileStyles();

  useEffect(() => {
    const loadData = async () => {
      if (agency) {
        setAgencyId(agency.id);
        setAgencyLabel(agency.name);
      }
      if (vehicle) {
        setVehicleId(vehicle);
      }
    };

    loadData();
  }, [agency, vehicle]);

  //  TODO: Changes in user.
  const handleConfirmChanges = async () => {
    if (
      agencyLabel &&
      agencyLabel.trim() !== '' &&
      agencyId &&
      vehicleId &&
      vehicleId.trim() !== '' &&
      !error
    ) {
      await setAgency({name: agencyLabel, id: agencyId});
      await setVehicle(vehicleId);
    }
  };

  const handleSelectAgency = (item: Item<number>) => {
    setAgencyId(item.value);
    setAgencyLabel(item.label);
  };

  const handleSelectVehicle = (text: string) => {
    setVehicleId(text);
  };

  const handleErrorChange = (hasError: boolean) => {
    setError(hasError);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Header pageTitle="Perfil" variant="3" />
        <View style={styles.square} />

        <UserPictureComponent
          name={`${user?.first_name} ${user?.last_name}`}
          picture=""
        />

        <View style={styles.contentContainer}>
          <View style={styles.profileDataContainer}>
            <ProfileDataField label="Cédula" value={user?.operator_id} />
            <ProfileDataField
              label="Teléfono"
              value={formatPhoneNumber(operator?.phone)}
            />
          </View>

          {/* TODO: changed agencies, and vehicles for actual values from API */}
          <View style={styles.inputContainer}>
            <AccordionList
              items={agencies}
              defaultLabel="Agencia"
              selectedItem={agencyId ?? undefined}
              onSelect={handleSelectAgency}
            />
            <AutocompleteTextInput
              label="Vehículo"
              suggestions={vehicles}
              disabled={!agencyLabel}
              onChangeText={handleSelectVehicle}
              onErrorChange={handleErrorChange}
              value={vehicle ?? undefined}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonConfirmChanges}
            onPress={handleConfirmChanges}
            disabled={error || (vehicleId !== null && vehicleId.trim() === '')}
          >
            <Text style={styles.buttonText}>Confirmar Cambios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonLogOut}
            onPress={() => {
              logOut(resetAppData);
            }}
          >
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

function formatPhoneNumber(phone: string | undefined): string {
  if (!phone) return '';
  const cleanedPhone = phone.replace(/\D/g, '');
  const formattedPhone = cleanedPhone.replace(/(\d{4})(\d{4})/, '$1-$2');

  return formattedPhone;
}
