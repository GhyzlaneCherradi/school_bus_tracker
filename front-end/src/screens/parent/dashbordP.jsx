import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DashboardScreen = ({ navigation }) => {
  const child = {
    name: "Adam Cherradi",
    school: "Al Amal School",
    busNumber: "Bus 12",
    pickupTime: "07:20 AM",
    status: "On the way",
    driverName: "Mr. Hassan",
    driverPhone: "+212 6 12 34 56 78",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome, Parent</Text>
          <Text style={styles.subText}>
            Track your child’s school bus in real time
          </Text>
        </View>

        {/* Child Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Child Information</Text>
          <Text style={styles.infoText}>Name: {child.name}</Text>
          <Text style={styles.infoText}>School: {child.school}</Text>
          <Text style={styles.infoText}>Assigned Bus: {child.busNumber}</Text>
        </View>

        {/* Bus Status Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bus Status</Text>
          <Text style={styles.status}>{child.status}</Text>
          <Text style={styles.infoText}>Pickup Time: {child.pickupTime}</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("MapScreen")}
          >
            <Text style={styles.primaryButtonText}>Track Bus Live</Text>
          </TouchableOpacity>
        </View>

        {/* Driver Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Driver Information</Text>
          <Text style={styles.infoText}>Driver: {child.driverName}</Text>
          <Text style={styles.infoText}>Phone: {child.driverPhone}</Text>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Call Driver</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("NotificationsScreen")}
          >
            <Text style={styles.actionText}>View Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("AttendanceScreen")}
          >
            <Text style={styles.actionText}>Check Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Text style={styles.actionText}>Manage Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest Update</Text>
          <Text style={styles.infoText}>
            The bus has left the previous stop and is expected in 10 minutes.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
  },
  subText: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: "#334155",
    marginBottom: 8,
  },
  status: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16A34A",
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  secondaryButtonText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "600",
  },
  actionButton: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  actionText: {
    color: "#1D4ED8",
    fontSize: 15,
    fontWeight: "600",
  },
});