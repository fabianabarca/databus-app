import {View, Image, TouchableOpacity} from 'react-native';
import {useHomeStyles} from '@/styles/home';
import Header from '@/components/Header';
import {StatusBar} from 'expo-status-bar';
import {Text, Icon} from 'react-native-paper';
import HomeInfoContainer from '@/components/HomeInfoContainer';
import {Link} from 'expo-router';

import {useAuth} from '@/providers/AuthProvider';
import {useAppData} from '@/src/providers/AppDataProvider';

const HomeScreen = () => {
  const {user} = useAuth();
  const {agency, vehicle} = useAppData();
  const styles = useHomeStyles();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header driverName={user?.first_name as string} variant="1" />

      <HomeInfoContainer
        vehicle={vehicle as string}
        agencia={agency?.name as string}
      />

      <View style={styles.content}>
        <Image source={require('@assets/images/busAzul.png')} />
        <Text style={styles.description}>
          Servicio de buses de la Universidad de Costa Rica
        </Text>
      </View>

      <Link href="/configuration" asChild>
        <TouchableOpacity style={styles.button}>
          <Icon size={20} source="bus" color="#FFFBFB" />
          <Text style={styles.buttonText}>Nuevo viaje</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default HomeScreen;
