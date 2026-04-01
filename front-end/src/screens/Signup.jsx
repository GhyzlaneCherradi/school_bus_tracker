import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import styles from "../styles/signUp";
import AuthAPI from "../apis/AuthAPI";

const SignupScreen = ({ navigation }) => {
  const [role, setRole] = useState("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [region, setRegion] = useState({
    latitude: 33.5731, // Default to Casablanca if no location
    longitude: -7.5898,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    if (role === "parent") {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        const newRegion = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        // Default marker to current location
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      })();
    }
  }, [role]);

  const parseName = (name) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2) return { firstName: "", lastName: "" };

    return {
      firstName: parts[0],
      lastName: parts.slice(1).join(" "),
    };
  };

  const handleSignup = async () => {
    setError("");

    const { firstName, lastName } = parseName(fullName);
    if (!firstName || !lastName) {
      setError("Please enter full name (first and last).");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (role === "parent" && !location) {
      setError("Please select your home location on the map.");
      return;
    }

    const payload = {
      firstName,
      lastName,
      email: email.trim().toLowerCase(),
      password,
      role,
      phoneNumber: phoneNumber.trim() || undefined,
      latitude: location?.latitude,
      longitude: location?.longitude,
    };

    try {
      setLoading(true);
      await AuthAPI.post("/user", payload);
      navigation.navigate("login");
    } catch (err) {
      const apiMessage = err?.response?.data?.message;
      if (Array.isArray(apiMessage)) {
        setError(apiMessage.join("\n"));
      } else {
        setError(apiMessage || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSignUpPress = async () => {
    await handleSignup();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create an Account</Text>

        {/* ROLE SELECTOR */}
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleBox,
              role === "parent" && styles.roleActive,
            ]}
            onPress={() => {
              setRole("parent");
            }}
          >
            <Text
              style={[
                styles.roleText,
                role === "parent" && styles.roleTextActive,
              ]}
            >
              Parent
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleBox,
              role === "driver" && styles.roleActive,
            ]}
            onPress={() => {
              setRole("driver");
            }}
          >
            <Text
              style={[
                styles.roleText,
                role === "driver" && styles.roleTextActive,
              ]}
            >
              Driver
            </Text>
          </TouchableOpacity>
        </View>

        {/* INPUTS */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        {/* HOME LOCATION (PARENT ONLY) */}
        {role === "parent" && (
          <View style={styles.mapContainer}>
            <Text style={styles.mapLabel}>
              Select Home Location (required)
            </Text>
            <MapView
              style={styles.map}
              region={region}
              onRegionChangeComplete={setRegion}
              onPress={(e) => setLocation(e.nativeEvent.coordinate)}
            >
              {location && <Marker coordinate={location} />}
            </MapView>
            <Text style={styles.mapHint}>
              Tap on the map to place your home marker.
            </Text>
          </View>
        )}

        {/* TERMS */}
        <Text style={styles.terms}>
          By signing up you agree to our Terms & Privacy Policy.
        </Text>
        {!!error && <Text style={styles.error}>{error}</Text>}

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={onSignUpPress}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating account..." : "Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;








