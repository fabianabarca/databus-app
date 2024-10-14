import { View } from "react-native";
import { Text } from "react-native-paper";
import { HomeInfoContainerStyles as S } from "./styles";

type HomeInfoContainerProps = {
  vehicle: string;
  agencia: string;
};

const HomeInfoContainer = ({ agencia, vehicle }: HomeInfoContainerProps) => {
  return (
    <View style={S.container}>
      <View>
        <Text style={S.title}>Vehículo</Text>
        <Text>{vehicle}</Text>
      </View>

      <View>
        <Text style={S.title}>Agencia</Text>
        <Text>{agencia}</Text>
      </View>
    </View>
  );
};

export default HomeInfoContainer;
