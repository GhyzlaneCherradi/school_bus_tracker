import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Tracking = ({ navigation }) => {
  const busInfo = {
    busNumber: "Bus 12",
    status: "On the way",
    currentLocation: "Near Hassan II Street",
    estimatedArrival: "07:25 AM",
    driverName: "Mr. Yassine",
    driverPhone: "+212 6 11 22 33 44",
    childName: "child 1",
    school: "Al Amal School",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Bus Tracking</Text>
        <Text style={styles.subtitle}>
          Follow your child’s school bus in real time
        </Text>

        {/* Map placeholder */}
        <View style={styles.mapCard}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Map View</Text>
            <Text style={styles.mapSubText}>
              Current bus position will appear here
            </Text>
          </View>
        </View>

        {/* Bus Status */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Bus Status</Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Bus Number</Text>
            <Text style={styles.value}>{busInfo.busNumber}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Current Status</Text>
            <Text style={styles.statusValue}>{busInfo.status}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Current Location</Text>
            <Text style={styles.value}>{busInfo.currentLocation}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Estimated Arrival</Text>
            <Text style={styles.value}>{busInfo.estimatedArrival}</Text>
          </View>
        </View>

        {/* Child Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Child Information</Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Child Name</Text>
            <Text style={styles.value}>{busInfo.childName}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>School</Text>
            <Text style={styles.value}>{busInfo.school}</Text>
          </View>
        </View>

        {/* Driver Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Driver Information</Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Driver Name</Text>
            <Text style={styles.value}>{busInfo.driverName}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{busInfo.driverPhone}</Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Call Driver</Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Refresh Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Text style={styles.buttonText}>Back to Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9dfe9",
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  title: {
    fontSize: 30,
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

  mapCard: {
    width: "100%",
    height: 230,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#f9f7f7ff",
    elevation: 5,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  mapPlaceholder: {
    width: "90%",
    height: "80%",
    borderRadius: 20,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  mapText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#7300A1",
    marginBottom: 8,
  },

  mapSubText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
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

  statusValue: {
    fontSize: 16,
    color: "#7300A1",
    fontWeight: "700",
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
});