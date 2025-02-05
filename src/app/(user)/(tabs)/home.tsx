import {View, Image, TouchableOpacity} from 'react-native';
import {HomeStyles as S} from '@/styles/home';
import Header from '@/components/Header';
import {StatusBar} from 'expo-status-bar';
import {Text, Icon} from 'react-native-paper';
import HomeInfoContainer from '@/components/HomeInfoContainer';
import {Link} from 'expo-router';

import {useAuth} from '@/providers/AuthProvider';

const HomeScreen = () => {
  const {user} = useAuth();
  return (
    <View style={S.container}>
      <StatusBar style="light" />
      <Header driverName={user?.first_name as string} variant="1" />

      <View style={S.content}>
        <Image source={require('@assets/images/busAzul.png')} />
        <Text style={S.description}>
          Servicio de buses de la Universidad de Costa Rica
        </Text>

        <HomeInfoContainer vehicle="SJB1234" agencia="bUCR" />
      </View>

      <Link href="/configuration" asChild>
        <TouchableOpacity style={S.button}>
          <Text style={S.buttonText}>Configurar nuevo viaje</Text>
          <Icon size={20} source="cog" color="#FAFAFA" />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default HomeScreen;
