import { StyleSheet } from "react-native";

export const ConfigurationStyles = StyleSheet.create({
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

  formText: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 16,
  },

  formContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },

  input: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#6DC067",
    borderRadius: 8,
  },

  formButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFE06A",
    borderRadius: 8,
    gap: 16,
  },

  formTextButton: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },

  tripContainer: {
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "auto",
  },

  trip: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#666666",
    fontWeight: "bold",
  },

  tripHour: {
    fontFamily: "Roboto",
    fontSize: 32,
    color: "#000",
    fontWeight: "bold",
  },

  startTripButton: {
    width: "90%",
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
