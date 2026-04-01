import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChild, setChildren } from "../../Redux/Children-Slice";
import { getParentChildren, getParentSettings, updateParentSettings } from "../../services/ParentDataService";

const Children = ({navigation}) => {
  const dispatch = useDispatch();
  const { list, selectedChildId } = useSelector((state) => state.children);

  useEffect(() => {
    const hydrate = async () => {
      const apiChildren = await getParentChildren();
      if (apiChildren.length > 0) dispatch(setChildren(apiChildren));

      const settings = await getParentSettings();
      if (settings?.selectedChildId) dispatch(selectChild(settings.selectedChildId));
    };
    hydrate();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Children</Text>
      <Text style={styles.subtitle}>Choose a child to track the assigned bus.</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {list.map((child) => {
          const selected = child.id === selectedChildId;
          return (
            <TouchableOpacity
              key={child.id}
              style={[styles.card, selected && styles.cardSelected]}
              onPress={() => {
                dispatch(selectChild(child.id));
                updateParentSettings({ selectedChildId: child.id });
              }}
            >
              <Text style={styles.name}>{child.name}</Text>
              <Text style={styles.info}>{child.level}</Text>
              <Text style={styles.info}>{child.school}</Text>
              <Text style={styles.info}>Assigned Bus: {child.busId}</Text>
              <Text style={[styles.badge, selected && styles.badgeSelected]}>
                {selected ? "Selected" : "Tap to select"}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Tracking")}>
          <Text style={styles.primaryButtonText}>Track Selected Child</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Children;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9dfe9", padding: 20 },
  title: { fontSize: 28, fontWeight: "700", color: "#000" },
  subtitle: { fontSize: 14, color: "#555", marginTop: 6, marginBottom: 16 },
  content: { paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardSelected: { borderColor: "#7300A1", backgroundColor: "#f7ebfd" },
  name: { fontSize: 18, fontWeight: "700", color: "#111" },
  info: { fontSize: 14, color: "#444", marginTop: 4 },
  badge: { marginTop: 10, color: "#666", fontWeight: "600" },
  badgeSelected: { color: "#7300A1" },
  primaryButton: {
    backgroundColor: "#7300A1",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});