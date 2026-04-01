import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Modal,
  FlatList,
  ActivityIndicator
} from "react-native";
import * as SecureStore from "expo-secure-store";
import AuthAPI from "../../apis/AuthAPI";
import { useEffect } from "react";

const AdminPanel = () => {
  const [childForm, setChildForm] = useState({
    parentId: "",
    name: "",
    level: "",
    school: "",
    busId: "",
    driverName: "",
    driverPhone: "",
    pickupTime: "",
  });
  const [alertForm, setAlertForm] = useState({
    childId: "",
    type: "delay",
    title: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [parents, setParents] = useState([]);
  const [showParentModal, setShowParentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchParents = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      const response = await AuthAPI.get("/user/parents", {
        headers: { Authorization: `bearer ${token}` },
      });
      setParents(response.data);
    } catch (err) {
      console.error("Admin: Failed to fetch parents:", err);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  const filteredParents = parents.filter(p => 
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const authorizedPost = async (url, payload) => {
    const token = await SecureStore.getItemAsync("access_token");
    return AuthAPI.post(url, payload, {
      headers: { Authorization: `bearer ${token}` },
    });
  };

  const createChild = async () => {
    setStatus("");
    setLoading(true);
    const cleanedForm = { ...childForm, parentId: childForm.parentId.trim() };
    
    console.log("Admin: Creating Child with:", cleanedForm);

    try {
      const response = await authorizedPost("/admin/children", cleanedForm);
      console.log("Admin: Child Created Successfully:", response.data);
      setStatus("Child created successfully.");
    } catch (err) {
      console.error("Admin: Request Error:", err.response?.data || err.message);
      const message = err?.response?.data?.message;
      setStatus(Array.isArray(message) ? message.join("\n") : (message || "Failed to create child."));
    } finally {
      setLoading(false);
    }
  };

  const createAlert = async () => {
    setStatus("");
    setLoading(true);
    const cleanedForm = { ...alertForm, childId: alertForm.childId.trim() };

    console.log("Admin: Creating Alert with:", cleanedForm);

    try {
      const response = await authorizedPost("/admin/alerts", cleanedForm);
      console.log("Admin: Alert Created Successfully:", response.data);
      setStatus("Alert created successfully.");
    } catch (err) {
      console.error("Admin: Request Error:", err.response?.data || err.message);
      const message = err?.response?.data?.message;
      setStatus(Array.isArray(message) ? message.join("\n") : (message || "Failed to create alert."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Admin Panel</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create Child</Text>
          <TouchableOpacity 
            style={styles.pickerButton} 
            onPress={() => setShowParentModal(true)}
          >
            <Text style={styles.pickerButtonText}>
              {childForm.parentId 
                ? parents.find(p => p.id === childForm.parentId) 
                  ? `${parents.find(p => p.id === childForm.parentId).firstName} ${parents.find(p => p.id === childForm.parentId).lastName}`
                  : "Parent Selected"
                : "Select Parent (Required)"}
            </Text>
          </TouchableOpacity>

          {[
            ["name", "Child Name"],
            ["level", "Level"],
            ["school", "School"],
            ["busId", "Bus ID"],
            ["driverName", "Driver Name"],
            ["driverPhone", "Driver Phone"],
            ["pickupTime", "Pickup Time"],
          ].map(([key, placeholder]) => (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={placeholder}
              value={childForm[key]}
              onChangeText={(value) => setChildForm((prev) => ({ ...prev, [key]: value }))}
            />
          ))}
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={createChild}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Processing..." : "Create Child"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create Alert</Text>
          {[
            ["childId", "Child ID (UUID)"],
            ["type", "Type (delay/pickup/...)"],
            ["title", "Title"],
            ["message", "Message"],
          ].map(([key, placeholder]) => (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={placeholder}
              value={alertForm[key]}
              onChangeText={(value) => setAlertForm((prev) => ({ ...prev, [key]: value }))}
            />
          ))}
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={createAlert}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Processing..." : "Create Alert"}
            </Text>
          </TouchableOpacity>
        </View>

        {!!status && <Text style={[styles.status, status.includes("successfully") ? styles.statusSuccess : styles.statusError]}>{status}</Text>}
      </ScrollView>

      {/* PARENT SELECTION MODAL */}
      <Modal
        visible={showParentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowParentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Parent</Text>
            
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or email..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <FlatList
              data={filteredParents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.parentItem}
                  onPress={() => {
                    setChildForm(prev => ({ ...prev, parentId: item.id }));
                    setShowParentModal(false);
                  }}
                >
                  <Text style={styles.parentName}>{item.firstName} {item.lastName}</Text>
                  <Text style={styles.parentEmail}>{item.email}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No parents found.</Text>
              }
            />

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowParentModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9dfe9" },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 26, fontWeight: "700", color: "#000" },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 12, borderWidth: 1, borderColor: "#ddd" },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    marginBottom: 8,
    backgroundColor: "#fafafa",
  },
  button: { backgroundColor: "#7300A1", borderRadius: 10, paddingVertical: 10, alignItems: "center", marginTop: 4 },
  buttonText: { color: "#fff", fontWeight: "700" },
  buttonDisabled: { backgroundColor: "#A66ABA" },
  status: { color: "#222", fontWeight: "600", textAlign: "center", marginTop: 10, padding: 10, borderRadius: 8 },
  statusSuccess: { backgroundColor: "#DCFCE7", color: "#166534" },
  statusError: { backgroundColor: "#FEE2E2", color: "#991B1B" },

  pickerButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#7300A1",
    borderStyle: "dashed",
  },
  pickerButtonText: {
    color: "#7300A1",
    fontWeight: "600",
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  parentItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  parentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  parentEmail: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#DDD",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  closeButtonText: {
    fontWeight: "700",
    color: "#333",
  },
});
