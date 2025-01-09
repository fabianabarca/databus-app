import { StyleSheet } from "react-native";

export const HomeInfoContainerStyles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },

  driverName: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#666666",
  },
});
