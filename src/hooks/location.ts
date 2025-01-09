import {useState, useEffect} from 'react';
import * as Location from 'expo-location';

export const useLocation = (interval = 10000) => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    const getLocationUpdates = async () => {
      setLoading(true);
      try {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: interval,
            distanceInterval: 0,
          },
          newLocation => {
            setLocation(newLocation.coords);
          },
        );
      } catch (error: any) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };

    getLocationUpdates();

    // Clean up
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [interval]);

  return {location, errorMsg, loading};
};
