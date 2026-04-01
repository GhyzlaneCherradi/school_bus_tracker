import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#efd9f4ff",
    padding: 20,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 22,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },

  input: {
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 15,
  },

  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  roleBox: {
    flex: 1,
    height: 45,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#CFCFCF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  roleActive: {
    backgroundColor: "#7D3C98",
    borderColor: "#7D3C98",
  },

  roleText: {
    fontWeight: "600",
    color: "#444",
    fontSize: 14,
  },

  roleTextActive: {
    color: "white",
  },

  mapContainer: {
    marginTop: 10,
    marginBottom: 20,
  },

  mapLabel: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },

  map: {
    height: 240,
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  mapHint: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
    fontStyle: "italic",
    textAlign: "center",
  },

  terms: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
    textAlign: "center",
  },

  signUpButton: {
    backgroundColor: "#551c62ff",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default styles;
