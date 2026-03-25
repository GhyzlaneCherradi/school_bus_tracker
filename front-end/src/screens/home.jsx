import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles/homeStyle.js";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Children Bus Tracker</Text>
      <View style={styles.imageCard}>
        <Image 
          source={require("../../assets/logo.png")} 
          style={styles.image}
        />
      </View>

      <Text style={styles.subtitle}>
        Safe and real-time school bus tracking
      </Text>

      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("login")}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


