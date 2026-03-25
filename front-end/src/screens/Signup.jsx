import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import styles from "../styles/signUp";

const SignupScreen = () => {
  const [role, setRole] = useState("parent");

  const onSignUpPress = async () => {
    await handleSignup(role);
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
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="Full Name"
          style={styles.input}
        />

        {/* HOME LOCATION (PARENT ONLY) */}
        {role === "parent" && (
          <View style={styles.mapContainer}>
            <Text style={styles.mapLabel}>
              Select Home Location (required)
            </Text>
          </View>
        )}

        {/* TERMS */}
        <Text style={styles.terms}>
          By signing up you agree to our Terms & Privacy Policy.
        </Text>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.signUpButton}
        >
          <Text style={styles.buttonText}>
             Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;








