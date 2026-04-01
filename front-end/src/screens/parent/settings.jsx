import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotificationsEnabled,
  setDelayThresholdMinutes,
  setVibrationEnabled,
  setLanguage,
} from "../../Redux/Settings-Slice";
import { getParentSettings, updateParentSettings } from "../../services/ParentDataService";

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    const hydrate = async () => {
      const dbSettings = await getParentSettings();
      if (!dbSettings) return;
      if (typeof dbSettings.notificationsEnabled === "boolean") {
        dispatch(setNotificationsEnabled(dbSettings.notificationsEnabled));
      }
      if (typeof dbSettings.vibrationEnabled === "boolean") {
        dispatch(setVibrationEnabled(dbSettings.vibrationEnabled));
      }
      if (typeof dbSettings.delayThresholdMinutes === "number") {
        dispatch(setDelayThresholdMinutes(dbSettings.delayThresholdMinutes));
      }
      if (typeof dbSettings.language === "string") {
        dispatch(setLanguage(dbSettings.language));
      }
    };
    hydrate();
  }, [dispatch]);

  useEffect(() => {
    updateParentSettings(settings);
  }, [settings]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Notifications</Text>
          <Switch
            value={settings.notificationsEnabled}
            onValueChange={(value) => dispatch(setNotificationsEnabled(value))}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Vibration</Text>
          <Switch
            value={settings.vibrationEnabled}
            onValueChange={(value) => dispatch(setVibrationEnabled(value))}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Delay threshold</Text>
        <View style={styles.inline}>
          {[5, 10, 15].map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.pill, settings.delayThresholdMinutes === m && styles.pillActive]}
              onPress={() => dispatch(setDelayThresholdMinutes(m))}
            >
              <Text style={[styles.pillText, settings.delayThresholdMinutes === m && styles.pillTextActive]}>
                {m} min
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Language</Text>
        <View style={styles.inline}>
          {["English", "French", "Arabic"].map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[styles.pill, settings.language === lang && styles.pillActive]}
              onPress={() => dispatch(setLanguage(lang))}
            >
              <Text style={[styles.pillText, settings.language === lang && styles.pillTextActive]}>
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9dfe9", padding: 20 },
  title: { fontSize: 28, fontWeight: "700", color: "#000", marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: { fontSize: 16, fontWeight: "600", color: "#222", marginBottom: 8 },
  inline: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  pill: { backgroundColor: "#f1f1f1", borderRadius: 999, paddingVertical: 8, paddingHorizontal: 12 },
  pillActive: { backgroundColor: "#7300A1" },
  pillText: { color: "#333", fontWeight: "600" },
  pillTextActive: { color: "#fff" },
});
