import { View, TouchableOpacity, TextInput } from "react-native";
import { ConfigurationStyles as S } from "@/styles/configuration";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native-paper";
import { Link, useRouter } from "expo-router";

const Configuration = () => {
  const router = useRouter();

  return (
    <View style={S.container}>
      <StatusBar style="light" />
      <Header
        driverName="Fabián"
        variant="2"
        hasBackButton
        onButtonClick={() => router.push("/")}
        pageTitle="Configuración del viaje"
      />

      <View style={S.content}>
        {/* Form title and container */}
        <Text style={S.formText}>Datos del viaje</Text>
        <View style={S.formContainer}>
          <TextInput style={S.input} placeholder="Ruta" />
          <TextInput style={S.input} placeholder="Día de operación" />
          <TextInput style={S.input} placeholder="Recorrido" />
          <TextInput style={S.input} placeholder="Sentido del recorrido" />
          <TouchableOpacity style={S.formButton}>
            <Text style={S.formTextButton}>Buscar viaje</Text>
          </TouchableOpacity>
        </View>

        <View style={S.tripContainer}>
          <Text style={S.trip}>Viaje seleccionado:</Text>
          <Text style={S.tripHour}>10:55 am</Text>
        </View>
      </View>

      <Link href="/trip" asChild>
        <TouchableOpacity style={S.startTripButton}>
          <Text style={S.buttonText}>Comenzar viaje</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Configuration;
