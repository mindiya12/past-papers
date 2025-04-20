import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
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
  Alert,
} from "react-native";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Placeholder for sign-up logic (e.g., Firebase authentication)
    // For now, navigate to SignIn screen with the email
    navigation.navigate("SignIn", { email });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Placeholder for the illustration */}
        <Animatable.Image
          animation="fadeInDown"
          duration={1000}
          delay={100}
          source={require("../assets/Mathematics-bro.png")}
          style={styles.illustration}
        />

        {/* Heading and Subheading */}
        <Animatable.Text animation="fadeInUp" delay={300} style={styles.title}>
          LET’S GET STARTED
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInUp"
          delay={500}
          style={styles.subtitle}
        >
          sign up
        </Animatable.Text>

        {/* Input Fields */}
        <Animatable.View
          animation="fadeInUp"
          delay={700}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
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
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </Animatable.View>

        {/* Sign Up Button */}
        <Animatable.View
          animation="zoomIn"
          delay={900}
          style={styles.buttonWrapper}
        >
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Log In Link */}
        <Animatable.View
          animation="fadeInUp"
          delay={1100}
          style={styles.footer}
        >
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.logInText}>Log in</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  illustration: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "#91E7A9",
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  signUpButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    width: "80%",
    borderRadius: 10,
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
  logInText: {
    fontSize: 14,
    color: "#FFD700",
    fontWeight: "bold",
  },
});
