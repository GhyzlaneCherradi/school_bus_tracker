import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
  flex: 1,                     
  width: "100%",               
  alignItems: "center", 
    paddingHorizontal: 20,      
  justifyContent: "flex-start", 
  padding: 180,
  backgroundColor: "#e9dfe9",
},
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  imageCard: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  subtitle: {
    fontSize: 16,
    color: "#444",
    marginTop: 10,
    marginBottom: 30,
    textAlign: "center",
  },

  button: {
    backgroundColor: "purple",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    elevation: 3,
  },

  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
});
export default styles;