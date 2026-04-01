import {View,Text,TouchableOpacity,ScrollView,StyleSheet,} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/auth_Slice";
import { updateParentProfile } from "../../Redux/Parent-Slice";
import { setChildren } from "../../Redux/Children-Slice";
import * as SecureStore from "expo-secure-store";
import { getParentProfile, getParentChildren } from "../../services/ParentDataService";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const parent = useSelector((state) => state.parent);
  const children = useSelector((state) => state.children.list);
  const initials = (parent.name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "P";

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    dispatch(logout());
    navigation.navigate("login");
  };

  useEffect(() => {
    const hydrate = async () => {
      const apiParent = await getParentProfile();
      if (apiParent) dispatch(updateParentProfile(apiParent));

      const apiChildren = await getParentChildren();
      if (apiChildren.length > 0) dispatch(setChildren(apiChildren));
    };
    hydrate();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.topLogoutButton} onPress={handleLogout}>
            <Text style={styles.topLogoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <Text style={styles.title}>{parent.name}</Text>
          <Text style={styles.subtitle}>{parent.relation}</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{parent.email}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{parent.phone}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Home Location</Text>
            {parent.latitude && parent.longitude ? (
              <View style={styles.miniMapContainer}>
                <MapView
                  style={styles.miniMap}
                  initialRegion={{
                    latitude: parent.latitude,
                    longitude: parent.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                >
                  <Marker
                    coordinate={{
                      latitude: parent.latitude,
                      longitude: parent.longitude,
                    }}
                  />
                </MapView>
              </View>
            ) : (
              <Text style={styles.noLocationText}>Location not set</Text>
            )}
          </View>
        </View>

        {/* Children */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>My Children</Text>

          {children.map((child) => (
            <View key={child.id} style={styles.childCard}>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.childText}>{child.level}</Text>
              <Text style={styles.childText}>Assigned Bus: {child.busId}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9dfe9",
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  topBar: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  topLogoutButton: {
    backgroundColor: "#7300A1",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    elevation: 2,
  },
  topLogoutText: {
    color: "#f3e3e3",
    fontSize: 14,
    fontWeight: "700",
  },

  profileCard: {
    width: "100%",
    backgroundColor: "#f9f7f7ff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 5,
    marginBottom: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#7300A1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#f3e3e3",
    fontSize: 30,
    fontWeight: "700",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
    color: "#000",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  sectionCard: {
    width: "100%",
    backgroundColor: "#f9f7f7ff",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 15,
  },

  infoBox: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#fafafa",
  },

  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
  },

  childCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#fafafa",
    marginBottom: 15,
  },

  childName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
    marginBottom: 5,
  },

  childText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 3,
  },

  actionButton: {
    backgroundColor: "#7300A1",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },

  actionText: {
    color: "#f3e3e3",
    fontSize: 18,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#7300A1",
    paddingVertical: 14,
    paddingHorizontal: 25,
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

});