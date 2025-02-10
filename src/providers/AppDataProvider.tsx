import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  useContext,
} from 'react';

import * as SecureStore from 'expo-secure-store';
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
  setEquipment: (equipment_id: string) => Promise<void>;
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
  setEquipment: async () => {},
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

      const storedEquipmentId = await SecureStore.getItemAsync('equipment');

      // console.log('Equipment ID: ', storedEquipmentId);

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

  // useEffect(() => {
  //   AsyncStorage.setItem('logs', JSON.stringify(logs));
  // }, [logs]);

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

  const setEquipment = async (newEquipmentId: string) => {
    setEquipmentIdState(newEquipmentId);

    await SecureStore.setItemAsync('equipment', newEquipmentId);
  };

  const resetAppData = async (): Promise<void> => {
    await AsyncStorage.removeItem('agency');
    await AsyncStorage.removeItem('vehicle');

    await AsyncStorage.clear();

    // TODO: Reset log data.
    console.log('Reset app data');
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
        setEquipment,
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
