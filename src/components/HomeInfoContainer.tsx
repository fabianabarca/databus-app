import {Platform, StyleSheet, useColorScheme, View} from 'react-native';
import {Text} from 'react-native-paper';

import {Colors} from '@constants/Colors';

type HomeInfoContainerProps = {
  vehicle: string;
  agencia: string;
};

const HomeInfoContainer = ({agencia, vehicle}: HomeInfoContainerProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Vehículo</Text>
        <Text style={styles.data}>{vehicle}</Text>
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.label}>Agencia</Text>
        <Text style={styles.data}>{agencia}</Text>
      </View>
    </View>
  );
};

export default HomeInfoContainer;

const useStyles = () => {
  const colorScheme = useColorScheme() as 'light' | 'dark';

  return StyleSheet.create({
    container: {
      width: '95%',
      height: 96,
      borderRadius: 15,
      marginTop: 20,
      backgroundColor: Colors.notFocusColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,

      ...Platform.select({
        ios: {
          shadowColor: Colors[colorScheme].text,
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: colorScheme === 'light' ? 0.25 : 0.2,
          shadowRadius: colorScheme === 'light' ? 4 : 2,
        },
        android: {
          elevation: 5, // Shadow for Android
        },
      }),
    },
    dataContainer: {
      height: '100%',
      width: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: 15,
      fontWeight: 500,
    },
    data: {
      fontSize: 20,
      fontWeight: 700,
    },
  });
};
