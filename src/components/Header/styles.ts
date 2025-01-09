import { StyleSheet } from "react-native";

export const HeaderStyles = StyleSheet.create({
  header: {
    width: "100%",
    height: 120,
    backgroundColor: "#005DA4",
    paddingHorizontal: 24,
    paddingTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerVariant: {
    width: "100%",
    height: 120,
    backgroundColor: "#005DA4",
    paddingTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 24,
  },

  hola: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#E1E1E6",
  },

  driverName: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#E1E1E6",
    fontWeight: "bold",
  },
});
