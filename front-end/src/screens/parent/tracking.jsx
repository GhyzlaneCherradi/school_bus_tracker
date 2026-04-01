import {View,Text,ScrollView,StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useBusLocation } from "../../hooks/useBusLocation";
import BusMap from "../../components/BusMap";

const Tracking = () => {
  const selectedChild = useSelector((state) =>
    state.children.list.find((child) => child.id === state.children.selectedChildId)
  );
  const selectedBusId = selectedChild?.busId;
  // initialisation of  the websocket connection
  useBusLocation(selectedBusId);

  // select the location controlled by the socket
  const trackingState = useSelector((state) => state.tracking);
  const { location, status, error, busId, speed, lastUpdated } = trackingState ;

  const getStatusMessage = () => {
    if (!selectedBusId) return "Select a child first";
    if (status === 'connected') return 'On the way';
    if (status === 'connecting') return 'Connecting...';
    if (status === 'REDUX_LOADED') return 'Waiting for Connection Hook...';
    if (status === 'NOT_INITIALIZED_IN_STORE') return 'CRITICAL: Redux Store Missing Slice';
    if (error) return error; 
    return 'Disconnected';
  };

  const getLiveState = () => {
    if (typeof speed !== "number") return "Unknown";
    if (speed <= 2) return "Stopped";
    return "Moving";
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return "No updates yet";
    const date = new Date(lastUpdated);
    if (Number.isNaN(date.getTime())) return "Invalid time";
    return date.toLocaleTimeString();
  };

  const busInfo = {
    busNumber: busId || "N/A",
    status: getStatusMessage(),
    currentLocation: location ? "Live Tracking Active" : "Waiting for location...",
    estimatedArrival: "Calculating...",
    movement: getLiveState(),
    currentSpeed: typeof speed === "number" ? `${speed.toFixed(1)} km/h` : "N/A",
    lastUpdated: formatLastUpdated(),
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

        {/* Real-time Map (SRP) */}
        <View style={styles.mapCard}>
          <BusMap/>
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
            <Text style={[styles.statusValue, status !== 'connected' && {color: 'red'}]}>
              {busInfo.status}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Estimated Arrival</Text>
            <Text style={styles.value}>{busInfo.estimatedArrival}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Movement</Text>
            <Text style={styles.value}>{busInfo.movement}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Current Speed</Text>
            <Text style={styles.value}>{busInfo.currentSpeed}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Last Update</Text>
            <Text style={styles.value}>{busInfo.lastUpdated}</Text>
          </View>
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
    height: "400",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
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