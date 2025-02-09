import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Agency} from '@/types';

// Define the data structure
type AppContextType = {
  agency: Agency | null;
  vehicle: string | null;
  equipmentId: string | null;
  journeyId: string | null;
  // logs: string[]; // Stores logs
  // favorites: {label: string; id: string}[]; // Favorite agencies
  setAgency: (agency: Agency) => Promise<void>;
  setVehicle: (vehicle: string) => Promise<void>;
  setEquipmentId: (equipment_id: string) => void;
  setJourneyId: (journey_id: string) => void;
  // addLog: (log: string) => void;
  // addFavorite: (fav: {label: string; id: string}) => void;
  resetAppData: () => Promise<void>;
  loading: boolean;
};

// Create Context
export const AppContext = createContext<AppContextType>({
  agency: null,
  vehicle: null,
  equipmentId: null,
  journeyId: null,
  setAgency: async () => {},
  setVehicle: async () => {},
  setEquipmentId: () => {},
  setJourneyId: () => {},
  resetAppData: async () => {},
  loading: true,
});

// Provider Component
export default function AppDataProvider({children}: PropsWithChildren) {
  const [agency, setAgencyState] = useState<Agency | null>(null);
  const [vehicle, setVehicleState] = useState<string | null>(null);
  const [equipmentId, setEquipmentIdState] = useState<string | null>(null);
  const [journeyId, setJourneyId] = useState<string | null>(null);
  // const [logs, setLogs] = useState<string[]>([]);
  // const [favorites, setFavorites] = useState<{label: string; id: string}[]>([]);
  const [loading, setLoading] = useState(true);

  // Load stored data on app startup
  useEffect(() => {
    const loadDataFromStorage = async () => {
      setLoading(true);
      const storedAgency = await AsyncStorage.getItem('agency');
      const storedVehicle = await AsyncStorage.getItem('vehicle');
      const storedEquipmentId = await AsyncStorage.getItem('equipment');

      // const storedLogs = await AsyncStorage.getItem('logs');
      // const storedFavorites = await AsyncStorage.getItem('favorites');

      if (storedAgency) setAgencyState(JSON.parse(storedAgency));
      if (storedVehicle) setVehicleState(storedVehicle);
      if (storedEquipmentId) setEquipmentIdState(storedEquipmentId);

      // setLogs(storedLogs ? JSON.parse(storedLogs) : []);
      // setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
      setLoading(false);
    };

    loadDataFromStorage();
  }, []);

  // Save logs when updated
  // useEffect(() => {
  //   AsyncStorage.setItem('logs', JSON.stringify(logs));
  // }, [logs]);

  // Save favorites when updated
  // useEffect(() => {
  //   AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  // }, [favorites]);

  // const addLog = (log: string) => {
  //   setLogs(prevLogs => [log, ...prevLogs].slice(0, 50)); // Keep max 50 logs
  // };

  // const addFavorite = (fav: {label: string; id: string}) => {
  //   setFavorites(prevFavs => [...prevFavs, fav]);
  // };

  const setAgency = async (newAgency: Agency) => {
    setAgencyState(newAgency);

    await AsyncStorage.setItem('agency', JSON.stringify(newAgency));
  };

  const setVehicle = async (newVehicle: string) => {
    setVehicleState(newVehicle);
    await AsyncStorage.setItem('vehicle', String(newVehicle));
  };

  const setEquipmentId = async (newEquipmentId: string) => {
    setEquipmentIdState(newEquipmentId);
    await AsyncStorage.setItem('equipment', String(newEquipmentId));
  };

  const resetAppData = async (): Promise<void> => {
    await AsyncStorage.removeItem('agency');
    await AsyncStorage.removeItem('vehicle');
    await AsyncStorage.removeItem('equipment');

    await AsyncStorage.clear();

    // TODO: Reset log data.
  };

  return (
    <AppContext.Provider
      value={{
        agency,
        vehicle,
        equipmentId,
        journeyId,
        // logs,
        // favorites,
        setAgency,
        setVehicle,
        setEquipmentId,
        setJourneyId,
        // addLog,
        // addFavorite,
        resetAppData,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppData = () => useContext(AppContext);
