import {View, Image, TouchableOpacity} from 'react-native';
import {HomeStyles as S} from '@/styles/home';
import Header from '@/components/Header';
import {StatusBar} from 'expo-status-bar';
import {Text, Icon} from 'react-native-paper';
import HomeInfoContainer from '@/components/HomeInfoContainer';
import {Link} from 'expo-router';

import {Api} from '@/api/api-client';

const Home = () => {
  const api = Api.getInstance();
  api.get<any>('/vehicle').then(console.log).catch(console.error);

  return (
    <View style={S.container}>
      <StatusBar style="light" />
      <Header driverName="Fabián" variant="1" />

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

export default Home;
