import React, { useState, useRef } from "react";
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

export default function VerifyOTPScreen({ navigation, route }) {
  const { email, otp } = route.params;
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOTPChange = (text, index) => {
    // Update the digit at the given index
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = text.replace(/[^0-9]/g, ""); // Only allow numbers
    setOtpDigits(newOtpDigits);

    // Auto-focus next input if a digit is entered
    if (text && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to previous input on backspace if the current field is empty
    if (e.nativeEvent.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otpDigits.join("");
    if (!enteredOTP || enteredOTP.length !== 4) {
      Alert.alert("Error", "Please enter a 4-digit OTP");
      return;
    }
    // Placeholder for OTP verification
    if (enteredOTP === otp) {
      navigation.navigate("CreateNewPassword", { email });
    } else {
      Alert.alert("Error", "Invalid OTP");
    }
  };

  const handleResendOTP = () => {
    // Placeholder for resending OTP
    const newOTP = Math.floor(1000 + Math.random() * 9000).toString();
    Alert.alert("Success", `New OTP sent to ${email}: ${newOTP} (for demo)`);
    navigation.setParams({ otp: newOTP });
    setOtpDigits(["", "", "", ""]); // Clear inputs
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Placeholder for the illustration */}
        <Image
          source={require("../assets/OTPverify.png")} // Illustration
          style={styles.illustration}
        />

        {/* Heading and Subheading */}
        <Text style={styles.title}>ENTER YOUR VERIFICATION CODE</Text>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {otpDigits.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOTPChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              autoCapitalize="none"
            />
          ))}
        </View>

        <Text style={styles.subtitle}>
          We sent a four digit verification code to your email{" "}
          <Text style={styles.highlightedEmail}>{email}</Text>. You can check
          your inbox.
        </Text>

        <TouchableOpacity
          onPress={handleResendOTP}
          style={styles.resendContainer}
        >
          <Text style={styles.resendText}>
            I didn’t receive the code? Send Again
          </Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>VERIFY</Text>
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
  highlightedEmail: {
    fontWeight: "bold",
    color: "#91E7A9", // Green to highlight email
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 15,
  },
  otpInput: {
    backgroundColor: "#91E7A9",
    borderRadius: 10,
    width: 50,
    height: 50,
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    marginHorizontal: 5,
  },
  resendContainer: {
    marginBottom: 15,
  },
  resendText: {
    fontSize: 14,
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center",
  },
  verifyButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 15,
    width: "80%",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
