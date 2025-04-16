import React from "react";
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

const semesters = [
  { id: "1", name: "Y1S1" },
  { id: "2", name: "Y1S2" },
  { id: "3", name: "Y2S1" },
  { id: "4", name: "Y2S2" },
  { id: "5", name: "Y3S1" },
  { id: "6", name: "Y3S2" },
];

export default function SemesterSelectionScreen({ route, navigation }) {
  const { university, degree } = route.params;

  const renderSemester = ({ item }) => (
    <TouchableOpacity
      style={styles.semesterCard}
      onPress={() => {
        // Placeholder for navigating to past papers screen
        alert(`Selected ${item.name} for ${degree} at ${university}`);
      }}
    >
      <Text style={styles.semesterText}>{item.name}</Text>
    </TouchableOpacity>
  );

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
            <Text style={styles.headerText}>{degree}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Semester Cards */}
      <FlatList
        data={semesters}
        renderItem={renderSemester}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
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
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  semesterCard: {
    flex: 1,
    backgroundColor: "#92E3A9",
    padding: 40,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  semesterText: {
    fontSize: 21,
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
