import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import LottieView from "lottie-react-native";

export default function PasswordUpdatedScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Lottie Animation */}
        <LottieView
          source={{
            uri: "https://lottie.host/d0c3ccb8-f132-4d75-9652-051b9afa0cd9/BLU6Uer0Kp.json",
          }}
          autoPlay
          loop={false}
          style={styles.lottie}
        />

        {/* Heading and Subheading */}
        <Text style={styles.title}>PASSWORD UPDATED</Text>
        <Text style={styles.subtitle}>Your password has been updated</Text>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  lottie: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
    width: "80%",
  },
  signInButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 15,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
