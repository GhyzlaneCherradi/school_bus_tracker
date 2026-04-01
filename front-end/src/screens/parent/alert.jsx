import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markAlertRead, markAllAlertsRead, setAlerts } from "../../Redux/Alerts-Slice";
import { getParentAlerts } from "../../services/ParentDataService";

const Alert = ({navigation}) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");
  const alerts = useSelector((state) => state.alerts.list);

  useEffect(() => {
    const hydrate = async () => {
      const apiAlerts = await getParentAlerts();
      if (apiAlerts.length > 0) dispatch(setAlerts(apiAlerts));
    };
    hydrate();
  }, [dispatch]);

  const unreadCount = alerts.filter((item) => !item.read).length;

  const filteredAlerts = useMemo(() => {
    if (filter === "unread") return alerts.filter((item) => !item.read);
    if (filter === "today") {
      const today = new Date().toDateString();
      return alerts.filter((item) => new Date(item.createdAt).toDateString() === today);
    }
    return alerts;
  }, [alerts, filter]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      <Text style={styles.subtitle}>{unreadCount} unread alerts</Text>

      <View style={styles.filters}>
        {["all", "unread", "today"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.filterButton, filter === item && styles.filterButtonActive]}
            onPress={() => setFilter(item)}
          >
            <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.markAllBtn} onPress={() => dispatch(markAllAlertsRead())}>
        <Text style={styles.markAllText}>Mark all as read</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {filteredAlerts.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, !item.read && styles.cardUnread]}
            onPress={() => dispatch(markAlertRead(item.id))}
          >
            <Text style={styles.alertTitle}>{item.title}</Text>
            <Text style={styles.alertMessage}>{item.message}</Text>
            <Text style={styles.alertMeta}>
              {item.type.toUpperCase()} • {new Date(item.createdAt).toLocaleString()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9dfe9", paddingHorizontal: 20, paddingTop: 12 },
  title: { fontSize: 28, fontWeight: "700", color: "#000" },
  subtitle: { color: "#555", marginTop: 4, marginBottom: 12 },
  filters: { flexDirection: "row", gap: 8, marginBottom: 10 },
  filterButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: "#f2f2f2" },
  filterButtonActive: { backgroundColor: "#7300A1" },
  filterText: { color: "#333", fontWeight: "600", textTransform: "capitalize" },
  filterTextActive: { color: "#fff" },
  markAllBtn: { alignSelf: "flex-start", marginBottom: 10 },
  markAllText: { color: "#7300A1", fontWeight: "700" },
  content: { paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardUnread: { borderColor: "#7300A1", backgroundColor: "#fcf7ff" },
  alertTitle: { fontSize: 16, fontWeight: "700", color: "#111" },
  alertMessage: { marginTop: 4, color: "#333" },
  alertMeta: { marginTop: 8, fontSize: 12, color: "#666" },
});
