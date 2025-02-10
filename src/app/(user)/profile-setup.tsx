import {useAuth} from '@providers/AuthProvider';
import {useAppData} from '@providers/AppDataProvider';
import ProfileForm from '@components/ProfileForm';

import * as Device from 'expo-device';

import {createEquipmentDetails} from '@/factories';

import {api} from '@/api/api-client';
import {EquipmentDetails, Operator} from '@/src/types';

const provider = '1964';
const NotSpecified = 'NS';

const ProfileSetupScreen = () => {
  const {user, operator} = useAuth();
  const {setAgency, setVehicle, setEquipment} = useAppData();

  // TODO: set up equipment properly.
  const handleConfirmChanges = async (
    agencyId: number,
    agencyLabel: string,
    vehicleId: string,
  ) => {
    const brand = Device.brand ?? NotSpecified;
    const model = Device.modelName ?? NotSpecified;
    const softwareVersion = Device.osVersion ?? NotSpecified;

    // TODO: may want to set vehicle as non-required.

    const equipmentDetails = createEquipmentDetails({
      agency: operator?.agencies ?? [],
      user: operator?.user as number,
      vehicle: vehicleId,
      data_provider: provider,
      brand,
      model,
      software_version: softwareVersion,
      provider: {
        vehicle: true,
      },
    });

    const {id} = await api.post<
      {id: string; serial_number: string | null},
      EquipmentDetails
    >('equipment/', {
      ...equipmentDetails,
    });

    // TODO: error handling and maybe set Vehicle, and maybe put user
    // const response = api.put<any, Operator>('operator/', {...(operator as Operator)});

    await setEquipment(id);
    await setAgency({name: agencyLabel, id: agencyId});
    await setVehicle(vehicleId);
  };

  return (
    <ProfileForm
      user={user}
      operator={operator}
      showLogout={false}
      onConfirm={handleConfirmChanges}
    />
  );
};

export default ProfileSetupScreen;
