import {View, Image, TouchableOpacity} from 'react-native';
import {useHomeStyles} from '@/styles/home';
import Header from '@/components/Header';
import {StatusBar} from 'expo-status-bar';
import {Text, Icon} from 'react-native-paper';
import HomeInfoContainer from '@/components/HomeInfoContainer';
import {Link} from 'expo-router';

import {useAuth} from '@/providers/AuthProvider';

const HomeScreen = () => {
  const {user} = useAuth();
  const styles = useHomeStyles();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header driverName={user?.first_name as string} variant="1" />

      <View style={styles.content}>
        <Image source={require('@assets/images/busAzul.png')} />
        <Text style={styles.description}>
          Servicio de buses de la Universidad de Costa Rica
        </Text>

        <HomeInfoContainer vehicle="SJB1234" agencia="bUCR" />
      </View>

      <Link href="/configuration" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Configurar nuevo viaje</Text>
          <Icon size={20} source="cog" color="#FAFAFA" />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default HomeScreen;
