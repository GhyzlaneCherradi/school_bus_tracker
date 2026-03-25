import { View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import styles from "../../styles/loginStyle";
import { SafeAreaView } from "react-native-safe-area-context";

const DashboardScreen = ({navigation}) => {
 

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Welcome </Text>
     
    </SafeAreaView>
  );
};

export default DashboardScreen;







