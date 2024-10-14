import { View, TouchableOpacity } from "react-native";
import { TripStyles as S } from "@/styles/trip";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import TripInfoContainer from "@/components/TripInfoContainer";

const Trip = () => {
  const router = useRouter();

  return (
    <View style={S.container}>
      <StatusBar style="light" />
      <Header
        driverName="Fabián"
        variant="2"
        onButtonClick={() => router.push("/")}
        pageTitle="Viaje en progreso"
      />

      <View style={S.content}>
        <View style={S.infoContainer}>
          <TripInfoContainer title="Ruta:" description="L1" />
          <TripInfoContainer
            title="Día de operación:"
            description="Entresemana"
          />
          <TripInfoContainer
            title="Trayectoria:"
            description="Desde educación con milla"
          />
          <TripInfoContainer
            title="Sentido:"
            description="Hacia las deportivas"
          />
          <TripInfoContainer
            title="Hora de inicio:"
            description="10:55:37 am"
          />
        </View>

        <View style={S.tripTimeContainer}>
          <Text style={S.timeTitle}>Tiempo transcurrido</Text>
          <Text style={S.time}>5 min 34 s</Text>
        </View>
      </View>

      <View style={S.buttonContainer}>
        <TouchableOpacity style={S.stopTripButton}>
          <Text style={S.buttonText}>Interrumpir viaje</Text>
        </TouchableOpacity>
        <Link href="/" asChild>
          <TouchableOpacity style={S.endTripButton}>
            <Text style={S.buttonText2}>Finalizar viaje</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Trip;
