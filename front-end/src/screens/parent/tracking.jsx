import { View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import styles from "../../styles/loginStyle";
import { SafeAreaView } from "react-native-safe-area-context";

const Tracking = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}> Tracking </Text>
    </SafeAreaView>
  );
};

export default Tracking;
