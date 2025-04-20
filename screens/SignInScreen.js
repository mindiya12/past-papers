import React, { useState, useEffect } from "react";
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

export default function SignInScreen({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Pre-fill email if passed from SignUpScreen
  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params?.email]);

  const handleSignIn = () => {
    if (email && password) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", "Please enter both email and password");
    }
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
          delay={200}
          source={require("../assets/lover-bro.png")}
          style={styles.illustration}
        />

        {/* Heading and Subheading */}
        <Animatable.Text animation="fadeInUp" delay={300} style={styles.title}>
          WELCOME BACK
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInUp"
          delay={400}
          style={styles.subtitle}
        >
          sign in
        </Animatable.Text>

        {/* Input Fields */}
        <Animatable.View
          animation="fadeIn"
          delay={500}
          style={styles.inputContainer}
        >
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
          <TouchableOpacity
            onPress={() => navigation.navigate("ResetPassword")}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Sign In Button */}
        <Animatable.View
          animation="zoomIn"
          delay={700}
          style={styles.buttonWrapper}
        >
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Create Account Link */}
        <Animatable.View animation="fadeInUp" delay={800} style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.createAccountText}>Create one now</Text>
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
    marginTop: 20,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  signInButton: {
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
  createAccountText: {
    fontSize: 14,
    color: "#FFD700",
    fontWeight: "bold",
  },
});
