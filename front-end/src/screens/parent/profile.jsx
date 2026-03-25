import { View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import styles from "../../styles/loginStyle";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}> Profile </Text>
    </SafeAreaView>
  );
};

export default Profile;
