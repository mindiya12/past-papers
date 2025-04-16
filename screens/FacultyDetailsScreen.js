import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  const toggleDropdown = (universityId) => {
    setExpanded((prev) => ({
      ...prev,
      [universityId]: !prev[universityId],
    }));
  };

  const renderDegree = ({ item, index }) => (
    <TouchableOpacity
      style={styles.degreeItem}
      onPress={() =>
        navigation.navigate("SemesterSelection", {
          university: universities.find((uni) => uni.id === item.universityId)
            .name,
          degree: item.name,
        })
      }
    >
      <Text style={styles.degreeText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderUniversity = ({ item }) => {
    const isExpanded = expanded[item.id] || false;
    const degrees = item.degrees[faculty] || [];

    if (degrees.length === 0) return null;

    return (
      <View style={styles.universityContainer}>
        <TouchableOpacity
          style={styles.universityHeader}
          onPress={() => toggleDropdown(item.id)}
        >
          <Text style={styles.universityText}>{item.name}</Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#000"
          />
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* App Bar */}
      <SafeAreaView style={styles.headerContainer}>
        <StatusBar backgroundColor="#FFD700" barStyle="dark-content" />
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              {faculty.replace(" FACULTY", "")}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* University List */}
      <FlatList
        data={universities}
        renderItem={renderUniversity}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
      />

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
  },
  universityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  degreeList: {
    marginTop: 10,
    marginLeft: 20,
  },
  degreeItem: {
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 5,
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
