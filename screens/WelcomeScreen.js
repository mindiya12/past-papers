import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

export default function WelcomeScreen({ navigation }) {
  const imageAnim = useRef(new Animated.Value(50)).current;
  const textAnim = useRef(new Animated.Value(50)).current;
  const buttonAnim = useRef(new Animated.Value(50)).current;

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.parallel([
        Animated.timing(imageAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(buttonAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Image */}
      <Animated.View
        style={{
          transform: [{ translateY: imageAnim }],
          opacity: imageOpacity,
          alignItems: "center",
        }}
      >
        <LottieView
          source={{
            uri: "https://lottie.host/c85c3f32-6924-448b-9389-bd4559e1a82d/yodNX18FGA.json",
          }}
          autoPlay
          loop
          style={styles.illustration}
        />
      </Animated.View>

      {/* Animated Text */}
      <Animated.View
        style={{
          transform: [{ translateY: textAnim }],
          opacity: textOpacity,
          alignItems: "center",
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Every Question Counts</Text>
          <Text style={styles.subtitle}>
            Excel at NSBM with Past Papers at{"\n"}Your Fingertips
          </Text>
        </View>
      </Animated.View>

      {/* Animated Buttons */}
      <Animated.View
        style={{
          transform: [{ translateY: buttonAnim }],
          opacity: buttonOpacity,
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 30,
  },
  illustration: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFC107",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  getStartedButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    marginTop: 15,
  },
  footerText: {
    color: "white",
    fontSize: 14,
  },
  signInText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 14,
  },
});
