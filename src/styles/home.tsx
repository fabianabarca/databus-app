import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 24,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },

  description: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#005DA4",
    fontWeight: "bold",
    marginTop: 24,
  },

  button: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#6DC067",
    borderRadius: 8,
    gap: 16,
  },

  buttonText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#FAFAFA",
    fontWeight: "bold",
  },
});
