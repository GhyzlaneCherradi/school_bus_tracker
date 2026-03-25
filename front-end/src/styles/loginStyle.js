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
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  imageCard: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#f9f7f7ff",
    elevation: 5,
    marginBottom: 20,
  },

  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color:"black"

  },

  button: {
    backgroundColor: "#7300A1",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },

  buttonText: {
    color: "#f3e3e3",
    fontSize: 18,
    fontWeight: "600",
  },

  registerText: {
    textAlign: "center",
    marginTop: 15,
    color: "#444",
  },

  registerLink: {
    color: "#7300A1",
    fontWeight: "700",
  },
});

export default styles;
