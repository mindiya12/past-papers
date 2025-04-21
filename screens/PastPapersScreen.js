import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

// Static data for papers (to be replaced with Firebase later)
const papers = [
  { id: "1", title: "paper 1" },
  { id: "2", title: "paper 2" },
  { id: "3", title: "paper 3" },
  { id: "4", title: "paper 4" },
  { id: "5", title: "paper 5" },
  { id: "6", title: "paper 6" },
];

export default function PastPapersScreen({ navigation, route }) {
  const { semester } = route.params;

  const renderPaper = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={600}>
      <View style={styles.paperItem}>
        <Text style={styles.paperText}>{item.title}</Text>
        <TouchableOpacity onPress={() => alert(`Download ${item.title}`)}>
          <Ionicons name="download-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* App Bar */}
      <SafeAreaView style={styles.headerContainer}>
        <StatusBar backgroundColor="#FFD700" barStyle="dark-content" />
        <View style={styles.appBar}>
          <Animatable.View animation="bounce" duration={600}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          </Animatable.View>
          <View style={styles.headerTextContainer}>
            <Animatable.Text
              animation="fadeIn"
              duration={800}
              style={styles.headerText}
            >
              {semester}
            </Animatable.Text>
          </View>
          <Animatable.View animation="bounce" duration={600}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Ionicons
                name="person"
                size={24}
                color="#000"
                style={styles.icon}
              />
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </SafeAreaView>

      {/* Papers List */}
      <FlatList
        data={papers}
        renderItem={renderPaper}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Animatable.View animation="bounce" duration={600}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Animatable.View animation="pulse" duration={300}>
              <Ionicons name="home-outline" size={30} color="#000" />
            </Animatable.View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="bounce" duration={600}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Animatable.View animation="pulse" duration={300}>
              <Ionicons name="search-outline" size={30} color="#000" />
            </Animatable.View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="bounce" duration={600}>
          <TouchableOpacity onPress={() => navigation.navigate("Downloads")}>
            <Animatable.View animation="pulse" duration={300}>
              <Ionicons name="download-outline" size={30} color="#000" />
            </Animatable.View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="bounce" duration={600}>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Animatable.View animation="pulse" duration={300}>
              <Ionicons name="settings-outline" size={30} color="#000" />
            </Animatable.View>
          </TouchableOpacity>
        </Animatable.View>
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
  icon: {
    marginLeft: 15,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 80,
  },
  paperItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#92E3A9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
  },
  paperText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
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
