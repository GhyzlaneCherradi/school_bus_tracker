import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getParentProfile } from "../../services/ParentDataService";
import { updateParentProfile } from "../../Redux/Parent-Slice";

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const parent = useSelector((state) => state.parent);
  const { selectedChildId, list } = useSelector((state) => state.children);
  const tracking = useSelector((state) => state.tracking);
  const alerts = useSelector((state) => state.alerts.list);

  useEffect(() => {
    const hydrate = async () => {
      const apiParent = await getParentProfile();
      if (apiParent) dispatch(updateParentProfile(apiParent));
    };
    hydrate();
  }, [dispatch]);

  const child = list.find((item) => item.id === selectedChildId) || list[0];
  const unreadCount = alerts.filter((item) => !item.read).length;
  const lastSeen = tracking.lastUpdated
    ? new Date(tracking.lastUpdated).toLocaleTimeString()
    : "No update yet";
  const liveStatus = tracking.status === "connected"
    ? (tracking.speed > 2 ? "Moving" : "Stopped")
    : "Disconnected";

  const locationMissing = !parent.latitude || !parent.longitude;

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

        {/* Location Warning */}
        {locationMissing && (
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}> Home Location Required</Text>
            <Text style={styles.warningText}>
              Please set your home location in Profile to receive proximity alerts.
            </Text>
            <TouchableOpacity
              style={styles.warningButton}
              onPress={() => navigation.navigate("profile")}
            >
              <Text style={styles.warningButtonText}>Set Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Child Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Child Information</Text>
          <Text style={styles.infoText}>Name: {child?.name || "N/A"}</Text>
          <Text style={styles.infoText}>School: {child?.school || "N/A"}</Text>
          <Text style={styles.infoText}>Assigned Bus: {child?.busId || "N/A"}</Text>
        </View>

        {/* Bus Status Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bus Status</Text>
          <Text style={styles.status}>{liveStatus}</Text>
          <Text style={styles.infoText}>Assigned Bus: {child?.busId || "N/A"}</Text>
          <Text style={styles.infoText}>Last Update: {lastSeen}</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Tracking")}
          >
            <Text style={styles.primaryButtonText}>Track Bus Live</Text>
          </TouchableOpacity>
        </View>

        {/* Driver Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Driver Information</Text>
          <Text style={styles.infoText}>Driver: {child?.driverName || "N/A"}</Text>
          <Text style={styles.infoText}>Phone: {child?.driverPhone || "N/A"}</Text>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Call Driver</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("alert")}
          >
            <Text style={styles.actionText}>View Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Children")}
          >
            <Text style={styles.actionText}>Select Child</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("profile")}
          >
            <Text style={styles.actionText}>Manage Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest Update</Text>
          <Text style={styles.infoText}>
            {unreadCount > 0
              ? `You have ${unreadCount} unread alerts.`
              : "No new alerts for your child."}
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
  warningCard: {
    backgroundColor: "#FEF2F2",
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#B91C1C",
    marginBottom: 4,
  },
  warningText: {
    fontSize: 14,
    color: "#7F1D1D",
    marginBottom: 12,
  },
  warningButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  warningButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});