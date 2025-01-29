import {View, Image, TouchableOpacity} from 'react-native';
import {HomeStyles as S} from '@/styles/home';
import Header from '@/components/Header';
import {StatusBar} from 'expo-status-bar';
import {Text, Icon} from 'react-native-paper';
import HomeInfoContainer from '@/components/HomeInfoContainer';
import {Link} from 'expo-router';

import {Api} from '@/api/api-client';
import {useLocation} from '@/hooks/location';
import {Provider} from '../types';

const Home = () => {
  // const {location, errorMsg, loading} = useLocation();
  const api = Api.getInstance();
  api
    .get<Provider[]>('/data-provider/')
    .then(data => {
      console.log('Result: ', data);
    })
    .catch(console.error);

  // console.log('Location: ', location);

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
