import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const faculties = [
  { id: "1", name: "Computing Faculty", icon: "laptop-outline" },
  { id: "2", name: "Business Faculty", icon: "briefcase" },
  { id: "3", name: "Engineering Faculty", icon: "construct" },
  { id: "4", name: "Medical Faculty", icon: "medkit" },
];

export default function HomeScreen({ navigation }) {
  // Animation values for each faculty card
  const fadeAnim = useRef(faculties.map(() => new Animated.Value(0))).current;
  const scaleAnim = useRef(
    faculties.map(() => new Animated.Value(0.9))
  ).current;
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate header text
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Staggered animation for faculty cards
    faculties.forEach((_, index) => {
      Animated.sequence([
        Animated.delay(index * 300),
        Animated.parallel([
          Animated.timing(fadeAnim[index], {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim[index], {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  }, []);

  const handleCardPress = (faculty, index) => {
    // Create a bounce effect when card is pressed
    Animated.sequence([
      Animated.timing(scaleAnim[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim[index], {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate("FacultyDegrees", { faculty: faculty.name });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* App Bar - No animations */}
      <SafeAreaView style={styles.headerContainer}>
        <StatusBar backgroundColor="#FFD700" barStyle="dark-content" />
        <View style={styles.appBar}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <View style={styles.appBarIcons}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Ionicons
                name="person"
                size={24}
                color="#000"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Animated Header Text */}
      <Animated.Text
        style={[
          styles.headerText,
          {
            opacity: headerAnim,
            transform: [
              {
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        Select Your Faculty
      </Animated.Text>

      {/* Faculty Cards with animations */}
      <ScrollView contentContainerStyle={styles.content}>
        {faculties.map((faculty, index) => (
          <Animated.View
            key={faculty.id}
            style={[
              {
                opacity: fadeAnim[index],
                transform: [{ scale: scaleAnim[index] }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardPress(faculty, index)}
              activeOpacity={0.9}
            >
              <Text style={styles.cardText}>{faculty.name}</Text>
              <Animated.View>
                <Ionicons
                  name={faculty.icon}
                  size={50}
                  color="#FCDC01"
                  style={styles.cardIcon}
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Bottom Navigation - No animations */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Ionicons name="search-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Downloads")}>
          <Ionicons name="download-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    backgroundColor: "#FFD700",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFD700",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  appBarIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 80,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#92E3A9",
    padding: 50,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
  },
  cardIcon: {
    marginLeft: 45,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
