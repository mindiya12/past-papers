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

export default function CreateNewPasswordScreen({ navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreatePassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    // Placeholder for updating password
    navigation.navigate("PasswordUpdated");
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
          source={require("../assets/Login-amico.png")} // Replace with appropriate asset
          style={styles.illustration}
        />

        {/* Heading and Subheading */}
        <Animatable.Text
          animation="fadeInLeft"
          delay={300}
          style={styles.title}
        >
          CREATE NEW PASSWORD
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInRight"
          delay={300}
          style={styles.subtitle}
        >
          Your new password must be different from previously used passwords
        </Animatable.Text>

        {/* Input Fields */}
        <Animatable.View
          animation="fadeIn"
          delay={500}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            placeholderTextColor="#999"
            value={newPassword}
            onChangeText={setNewPassword}
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

        {/* Create Button */}
        <Animatable.View
          animation="fadeInUp"
          delay={600}
          style={styles.buttonWrapper}
        >
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreatePassword}
          >
            <Text style={styles.buttonText}>CREATE</Text>
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
    marginTop: "20",
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
  createButton: {
    backgroundColor: "#FFC107",
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
