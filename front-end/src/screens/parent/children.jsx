import { View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import styles from "../../styles/loginStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthAPI from "../../apis/AuthAPI";
import * as SecureStore from 'expo-secure-store';

const children = ({navigation}) => {
   const getinfo= async()=>{
    const token= await SecureStore.getItemAsync("access_token");
    const response=await AuthAPI.get("/auth/users",{
      headers: {
        Authorization:`bearer ${token}`,
      }
    });
    console.log(response.data.message);
    if(response.data.message==="connexion reussie"){
      console.log("ok");
    }else{
      console.log("not ok");
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}> children </Text>
       <TouchableOpacity  onPress={getinfo}>
        <Text style={styles.registerLink}> get info</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};
export default children;