import {useAuth} from '@providers/AuthProvider';
import {useAppData} from '@providers/AppDataProvider';
import ProfileForm from '@components/ProfileForm';

import {api} from '@/api/api-client';
import {Operator} from '@/src/types';

const ProfileScreen = () => {
  const {user, operator} = useAuth();
  const {setAgency, setVehicle} = useAppData();

  const handleConfirmChanges = async (
    agencyId: number,
    agencyLabel: string,
    vehicleId: string,
  ) => {
    // const response = api.patch<any, Operator>(
    //   'operator/',
    //   operator as Operator,
    // );
    // console.log('Response: ', response);

    setAgency({name: agencyLabel, id: agencyId});
    setVehicle(vehicleId);
  };

  return (
    <ProfileForm
      user={user}
      operator={operator}
      showLogout={true}
      onConfirm={handleConfirmChanges}
    />
  );
};

export default ProfileScreen;
