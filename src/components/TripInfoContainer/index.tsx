import { View } from "react-native";
import { Text } from "react-native-paper";
import { TripInfoContainerStyles as S } from "./styles";

type TripInfoContainerProps = {
  title: string;
  description: string;
};

const TripInfoContainer = ({ title, description }: TripInfoContainerProps) => {
  return (
    <View style={S.container}>
      <Text style={S.title}>{title}</Text>
      <Text style={S.description}>{description}</Text>
    </View>
  );
};

export default TripInfoContainer;
