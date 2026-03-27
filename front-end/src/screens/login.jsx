import { View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import styles from "../styles/loginStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
const LoginScreen = ({navigation}) => {

  const [email, setemail]=useState("");
  const [password,setpassword]=useState("");
  const { login, error, loading } = useAuth();
  const handlelogin=async()=>{
       await login(email,password);
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      {/* Image */}
      <View style={styles.imageCard}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logoImage}/>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input} 
          placeholder="Email"
          value={email}
          onChangeText={setemail}
          placeholderTextColor="#0c0c0c"/>
        
        <TextInput style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setpassword}
          placeholderTextColor="#0c0c0c"
          secureTextEntry />
          {error ? <Text style={{color:"red"}}>{error}</Text> : null}
        {/* Login Button */}
         <TouchableOpacity
          style={styles.button} onPress={handlelogin}>
         
          <Text style={styles.buttonText}> Log in
          </Text>
        </TouchableOpacity>

        {/* Register Link */}
        <TouchableOpacity >
          <Text style={styles.registerText}>
            Don't have an account?
            <Text style={styles.registerLink} onPress={()=>{navigation.navigate("signUp")}}> Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;







