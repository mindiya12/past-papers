import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Image } from "react-native";

export default function SplashScreen({ navigation }) {
  // Animation value for the loading bar
  const loadingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the loading bar animation
    Animated.timing(loadingAnim, {
      toValue: 1, // Animate from 0 to 1
      duration: 2000, // 2 seconds
      useNativeDriver: false, // useNativeDriver must be false for width animations
    }).start(() => {
      // After the animation completes, navigate to the Welcome screen
      navigation.replace("Welcome");
    });
  }, [loadingAnim, navigation]);

  // Interpolate the loading bar width from 0% to 100%
  const loadingWidth = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* Logo with Yellow Background */}
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>

      {/* Loading Bar */}
      <View style={styles.loadingBarContainer}>
        <Animated.View style={[styles.loadingBar, { width: loadingWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#52D276", // Green background
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 140, // Slightly larger to give padding around the logo
    height: 140,
    backgroundColor: "#FFD700", // Yellow background behind the logo
    borderRadius: 70, // Make it circular
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  loadingBarContainer: {
    width: "80%",
    height: 10,
    backgroundColor: "#FFFFFF", // Black background for the loading bar
    borderRadius: 5,
    marginTop: 50,
  },
  loadingBar: {
    height: "100%",
    backgroundColor: "#000", // Gray color for the loading bar
    borderRadius: 5,
  },
});
