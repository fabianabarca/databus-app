import { StyleSheet } from "react-native";

export const TripStyles = StyleSheet.create({
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

  infoContainer: {
    width: "100%",
    gap: 24,
    alignItems: "flex-start",
  },

  buttonContainer: {
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  tripTimeContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    gap: 4,
    alignItems: "center",
    margin: "auto",
  },

  timeTitle: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#666665",
    fontWeight: "bold",
  },

  time: {
    fontFamily: "Roboto",
    fontSize: 36,
    color: "#000",
    fontWeight: "bold",
  },

  stopTripButton: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFE06A",
    borderRadius: 8,
    gap: 16,
  },

  endTripButton: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#B82828",
    borderRadius: 8,
    gap: 16,
  },

  buttonText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },

  buttonText2: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#FAFAFA",
    fontWeight: "bold",
  },
});
