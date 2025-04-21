import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const universities = [
  {
    id: "1",
    name: "Plymouth University",
    degrees: {
      "Computing Faculty": [
        "Computer Science",
        "Data Science",
        "Computer Networks",
        "Computer Security",
        "Software Engineering",
        "Technology Management",
      ],
      "Business Faculty": ["Business Administration", "Marketing", "Finance"],
      "Engineering Faculty": ["Mechanical Engineering", "Civil Engineering"],
      "Medical Faculty": ["Medicine", "Nursing"],
    },
  },
  {
    id: "2",
    name: "UGC",
    degrees: {
      "Computing Faculty": [
        "Computer Science",
        "Data Science",
        "Computer Networks",
        "Software Engineering",
        "MIS",
      ],
      "Business Faculty": ["Accounting", "Economics"],
      "Engineering Faculty": ["Electrical Engineering", "Chemical Engineering"],
      "Medical Faculty": ["Pharmacy", "Dentistry"],
    },
  },
  {
    id: "3",
    name: "Victoria University",
    degrees: {
      "Computing Faculty": ["Cyber Security"],
      "Business Faculty": ["International Business"],
      "Engineering Faculty": ["Aerospace Engineering"],
      "Medical Faculty": ["Biomedical Science"],
    },
  },
];

export default function FacultyDegreesScreen({ route, navigation }) {
  const { faculty } = route.params;
  const [expanded, setExpanded] = useState({});

  // Animation values for page entrance
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  // Create rotation animations for dropdown icons
  const rotationAnimations = useRef(
    universities.reduce((acc, uni) => {
      acc[uni.id] = new Animated.Value(0);
      return acc;
    }, {})
  ).current;

  // Pre-initialize university animations
  const universityAnimations = useRef(
    universities.map((_, i) => ({
      fade: new Animated.Value(0),
      translateY: new Animated.Value(30),
    }))
  ).current;

  // Pre-initialize degree animations for each university
  const degreeAnimations = useRef({}).current;

  universities.forEach((uni) => {
    if (!degreeAnimations[uni.id]) {
      const degrees = uni.degrees[faculty] || [];
      degreeAnimations[uni.id] = degrees.map(() => new Animated.Value(0.9));
    }
  });

  // Run entrance animations on component mount
  useEffect(() => {
    // Main page entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Staggered university animations
    universities.forEach((_, index) => {
      const { fade, translateY } = universityAnimations[index];
      Animated.sequence([
        Animated.delay(index * 150),
        Animated.parallel([
          Animated.timing(fade, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  }, []);

  // Handle degree animations when universities expand
  useEffect(() => {
    Object.entries(expanded).forEach(([uniId, isExpanded]) => {
      if (isExpanded) {
        const degrees =
          universities.find((u) => u.id === uniId)?.degrees[faculty] || [];
        degrees.forEach((_, index) => {
          if (degreeAnimations[uniId] && degreeAnimations[uniId][index]) {
            Animated.sequence([
              Animated.delay(index * 50),
              Animated.spring(degreeAnimations[uniId][index], {
                toValue: 1,
                friction: 6,
                useNativeDriver: true,
              }),
            ]).start();
          }
        });
      }
    });
  }, [expanded]);

  const toggleDropdown = (universityId) => {
    // Configure layout animation for smooth height change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Rotate chevron animation
    Animated.timing(rotationAnimations[universityId], {
      toValue: expanded[universityId] ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Update expanded state
    setExpanded((prev) => ({
      ...prev,
      [universityId]: !prev[universityId],
    }));
  };

  const animateDegreePress = (universityId, degreeIndex, callback) => {
    if (
      degreeAnimations[universityId] &&
      degreeAnimations[universityId][degreeIndex]
    ) {
      const scaleAnim = degreeAnimations[universityId][degreeIndex];

      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start(callback);
    } else {
      callback();
    }
  };

  const renderDegree = ({ item, index }) => {
    const uniId = item.universityId;
    const scaleAnim = degreeAnimations[uniId] && degreeAnimations[uniId][index];

    return (
      <Animated.View
        style={{
          opacity: scaleAnim || 1,
          transform: [{ scale: scaleAnim || 1 }],
        }}
      >
        <TouchableOpacity
          style={styles.degreeItem}
          onPress={() => {
            animateDegreePress(uniId, index, () => {
              navigation.navigate("SemesterSelection", {
                university: universities.find((uni) => uni.id === uniId).name,
                degree: item.name,
              });
            });
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.degreeText}>{item.name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderUniversity = ({ item, index }) => {
    const isExpanded = expanded[item.id] || false;
    const degrees = item.degrees[faculty] || [];

    if (degrees.length === 0) return null;

    const { fade, translateY } = universityAnimations[index] || {
      fade: new Animated.Value(1),
      translateY: new Animated.Value(0),
    };
    const rotateZ =
      rotationAnimations[item.id]?.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
      }) || "0deg";

    return (
      <Animated.View
        style={[
          styles.universityContainer,
          {
            opacity: fade,
            transform: [{ translateY }],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.universityHeader,
            isExpanded && styles.universityHeaderExpanded,
          ]}
          onPress={() => toggleDropdown(item.id)}
          activeOpacity={0.9}
        >
          <Text style={styles.universityText}>{item.name}</Text>
          <Animated.View style={{ transform: [{ rotateZ }] }}>
            <Ionicons name="chevron-down" size={24} color="#000" />
          </Animated.View>
        </TouchableOpacity>

        {isExpanded && (
          <FlatList
            data={degrees.map((degree, index) => ({
              name: degree,
              universityId: item.id,
              id: `${item.id}-${index}`,
            }))}
            renderItem={renderDegree}
            keyExtractor={(degree) => degree.id}
            style={styles.degreeList}
          />
        )}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* App Bar */}
      <SafeAreaView style={styles.headerContainer}>
        <StatusBar backgroundColor="#FFD700" barStyle="dark-content" />
        <View style={styles.appBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              {faculty.replace(" Faculty", "")}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* University List with entrance animation */}
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY }],
        }}
      >
        <FlatList
          data={universities}
          renderItem={renderUniversity}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
        />
      </Animated.View>

      {/* Bottom Navigation */}
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
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    backgroundColor: "#FFD700",
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD700",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFD700",
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 80,
  },
  universityContainer: {
    marginBottom: 15,
  },
  universityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#92E3A9",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  universityHeaderExpanded: {
    backgroundColor: "#7ED39A",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  universityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  degreeList: {
    marginTop: 5,
    marginLeft: 10,
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  degreeItem: {
    padding: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginTop: 5,
    elevation: 1,
  },
  degreeText: {
    fontSize: 16,
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
