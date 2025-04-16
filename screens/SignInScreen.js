import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from "react-native";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Placeholder for sign-in logic (e.g., Firebase authentication)
    // For now, navigate to Home screen on button press
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior for iOS and Android
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Fine-tune offset for Android
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Placeholder for the illustration */}
        <Image
          source={require("../assets/lover-bro.png")}
          style={styles.illustration}
        />

        {/* Heading and Subheading */}
        <Text style={styles.title}>WELCOME BACK</Text>
        <Text style={styles.subtitle}>sign in</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email or Username"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>

        {/* Create Account Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.createAccountText}>Create one now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  illustration: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Solid white background
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  placeholderText: {
    color: "#666",
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#E6F0FA", // Light green background for input fields
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  signInButton: {
    backgroundColor: "#FFD700", // Yellow color for Sign In
    paddingVertical: 15,
    width: "80%",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  createAccountText: {
    fontSize: 14,
    color: "#FFD700", // Yellow for the link
    fontWeight: "bold",
  },
});
