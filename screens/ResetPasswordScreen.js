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

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handleSendOTP = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    // Placeholder for sending OTP (e.g., via Firebase)
    const generatedOTP = Math.floor(1000 + Math.random() * 9000).toString(); // Simulated 4-digit OTP
    navigation.navigate("VerifyOTP", { email, otp: generatedOTP });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/*Heading*/}
        <Animatable.Text animation="fadeInUp" delay={200} style={styles.title}>
          RESET PASSWORD
        </Animatable.Text>
        <Animatable.Image
          animation="fadeInDown"
          delay={300}
          source={require("../assets/ResetPasswordEmail.png")} // Illustration
          style={styles.illustration}
        />

        {/*Subheading */}

        <Animatable.Text
          animation="fadeInLeft"
          delay={500}
          style={styles.subtitle}
        >
          Please enter your email address to receive a verification code
        </Animatable.Text>

        {/* Input Field */}
        <Animatable.View
          animation="fadeIn"
          delay={700}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </Animatable.View>

        {/* Send Button */}
        <Animatable.View
          animation="fadeInUp"
          delay={500}
          style={styles.buttonWrapper}
        >
          <TouchableOpacity style={styles.sendButton} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>SEND</Text>
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
    width: 300,
    height: 300,
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
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    width: "80%",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#91E7A9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  sendButton: {
    backgroundColor: "#FFC107", // Yellow to match the image
    paddingVertical: 15,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
