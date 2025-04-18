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
        <Text style={styles.title}>RESET PASSWORD</Text>
        <Image
          source={require("../assets/ResetPasswordEmail.png")} // Illustration
          style={styles.illustration}
        />

        {/*Subheading */}

        <Text style={styles.subtitle}>
          Please enter your email address to receive a verification code
        </Text>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendOTP}>
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#3DBD61", // Green to match the image
    paddingVertical: 15,
    width: "80%",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
