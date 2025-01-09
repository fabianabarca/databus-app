import {createContext, PropsWithChildren, useContext, useState} from 'react';

type LocationData = {
  location: string;
};

const LocationContext = createContext<LocationData>({
  location: 'This is a test',
});

export default function LocationProvider({children}: PropsWithChildren) {
  const [location, setLocation] = useState<string>('This is a test');

  return (
    <LocationContext.Provider value={{location}}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);
