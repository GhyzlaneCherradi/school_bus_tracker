import { StyleSheet, View} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useSelector } from "react-redux";
const BusMap = () => {
  // Center area: (Mohammedia)
  const trackingState = useSelector((state) => state.tracking);
  const { location, path } = trackingState ;
  const defaultRegion = {
    latitude: location?.latitude || 33.6896,
    longitude: location?.longitude || -7.3888,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={defaultRegion}
        region={
          location
            ? {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }
            : defaultRegion
        }
      >
        {/* Render path line */}
        {path && path.length > 1 && (
          <Polyline
            coordinates={path}
            strokeColor="#7300A1" 
            strokeWidth={4}
          />
        )}

        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={"School Bus"}
            description={"Live Tracking Location"}
          />
        )}
      </MapView>
    </View>
  );
};

export default BusMap;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
  }
});
