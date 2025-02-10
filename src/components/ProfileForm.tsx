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
import {useAppData} from '@providers/AppDataProvider';
import {useRouter} from 'expo-router';
import {useAuth} from '@providers/AuthProvider';

// TODO: Fetch agencies and vehicles form API
const agencies = [
  {label: 'bUCR', value: 1},
  {label: 'TSG', value: 2},
  {label: 'Transtusa', value: 3},
];
const vehicles = ['SJB1234', 'SJB5678'];

const ProfileForm = ({
  user,
  operator,
  showLogout = true,
  onConfirm,
}: {
  user: any;
  operator: any;
  showLogout?: boolean;
  onConfirm: (
    agencyId: number,
    agencyLabel: string,
    vehicleId: string,
  ) => Promise<void>;
}) => {
  const [agencyId, setAgencyId] = useState<number | null>(null);
  const [agencyLabel, setAgencyLabel] = useState<string | null>(null);
  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const {logOut} = useAuth();
  const {agency, vehicle, resetAppData} = useAppData();
  const styles = useProfileStyles();
  const router = useRouter();

  const confirmChangesText = showLogout ? 'Confirmar Cambios' : 'Guardar Datos';

  useEffect(() => {
    if (agency) {
      setAgencyId(agency.id);
      setAgencyLabel(agency.name);
    }
    if (vehicle) {
      setVehicleId(vehicle);
    }
  }, [agency, vehicle]);

  const handleConfirmChanges = async () => {
    if (agencyId && agencyLabel && vehicleId && !error) {
      await onConfirm(agencyId, agencyLabel, vehicleId);
      router.replace('/(user)/(tabs)/home');
    }
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

          <View style={styles.inputContainer}>
            <AccordionList
              items={agencies}
              defaultLabel="Agencia"
              selectedItem={agencyId ?? undefined}
              onSelect={item => {
                setAgencyId(item.value);
                setAgencyLabel(item.label);
              }}
            />
            <AutocompleteTextInput
              label="Vehículo"
              suggestions={vehicles}
              disabled={!agencyLabel}
              onChangeText={setVehicleId}
              onErrorChange={setError}
              value={vehicleId ?? undefined}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonConfirmChanges}
            onPress={handleConfirmChanges}
            disabled={error || !vehicleId?.trim()}
          >
            <Text style={styles.buttonText}>{confirmChangesText}</Text>
          </TouchableOpacity>

          {showLogout && (
            <TouchableOpacity
              style={styles.buttonLogOut}
              onPress={async () => {
                await logOut(resetAppData);
              }}
            >
              <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
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

const ProfileDataField = ({label, value}: {label: string; value: string}) => {
  const styles = useProfileStyles();
  return (
    <View style={styles.profileDataFieldContainer}>
      <Text style={styles.dataFieldLabel}>{label}</Text>
      <Text style={styles.dataFieldValue}>{value}</Text>
    </View>
  );
};

function formatPhoneNumber(phone: string | undefined): string {
  if (!phone) return '';
  return phone.replace(/\D/g, '').replace(/(\d{4})(\d{4})/, '$1-$2');
}

export default ProfileForm;
