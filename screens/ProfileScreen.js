import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

export default function ProfileScreen({ navigation, route }) {
  // Placeholder user data (replace with backend data, e.g., Firebase)
  const user = {
    username: route.params?.username || "testuser", // From SignUpScreen
    email: route.params?.email || "test@example.com", // From SignUpScreen
    papersViewed: 15,
    papersDownloaded: 5,
    studyStreak: 3,
    recentPapers: [
      { id: "1", title: "Mathematics 2023 - Faculty of Science" },
      { id: "2", title: "Physics 2022 - Faculty of Engineering" },
    ],
  };

  const handleSignOut = () => {
    // Placeholder for sign-out logic (e.g., Firebase sign-out)
    navigation.reset({
      index: 0,
      routes: [{ name: "SignIn" }],
    });
  };

  const renderRecentPaper = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={600}>
      <TouchableOpacity
        style={styles.recentPaperItem}
        onPress={() => navigation.navigate("DegreePapers")} // Navigate to paper detail
      >
        <Animatable.View animation="zoomIn" duration={300}>
          <Text style={styles.recentPaperText}>{item.title}</Text>
        </Animatable.View>
      </TouchableOpacity>
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
              PROFILE
            </Animatable.Text>
          </View>
          <View>
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

      {/* Scrollable Profile Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info */}
        <Animatable.View
          animation="fadeInUp"
          duration={600}
          delay={0}
          style={styles.userInfoContainer}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.username[0].toUpperCase()}
            </Text>
          </View>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Animatable.View animation="zoomIn" duration={300}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </Animatable.View>
          </TouchableOpacity>
        </Animatable.View>

        {/* Stats Section */}
        <Animatable.View
          animation="fadeInUp"
          duration={600}
          delay={200}
          style={styles.statsContainer}
        >
          <View style={styles.statItemContainer}>
            <Text style={styles.statValue}>{user.papersViewed}</Text>
            <Text style={styles.statLabel}>Papers Viewed</Text>
          </View>
          <View style={styles.statItemContainer}>
            <Text style={styles.statValue}>{user.papersDownloaded}</Text>
            <Text style={styles.statLabel}>Papers Downloaded</Text>
          </View>
          <View style={styles.statItemContainer}>
            <Text style={styles.statValue}>{user.studyStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </Animatable.View>

        {/* Account Actions */}
        <Animatable.View
          animation="fadeInUp"
          duration={600}
          delay={400}
          style={styles.actionsContainer}
        >
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <Animatable.View animation="zoomIn" duration={300}>
              <View style={styles.actionButtonContent}>
                <Ionicons name="lock-closed-outline" size={24} color="#333" />
                <Text style={styles.actionText}>Change Password</Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <Animatable.View animation="zoomIn" duration={300}>
              <View style={styles.actionButtonContent}>
                <Ionicons name="settings-outline" size={24} color="#333" />
                <Text style={styles.actionText}>Settings</Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleSignOut}>
            <Animatable.View animation="zoomIn" duration={300}>
              <View style={styles.actionButtonContent}>
                <Ionicons name="log-out-outline" size={24} color="#333" />
                <Text style={styles.actionText}>Sign Out</Text>
              </View>
            </Animatable.View>
          </TouchableOpacity>
        </Animatable.View>

        {/* Recent Papers */}
        <Animatable.View
          animation="fadeInUp"
          duration={600}
          delay={600}
          style={styles.recentPapersContainer}
        >
          <Text style={styles.sectionTitle}>Recent Papers</Text>
          <FlatList
            data={user.recentPapers}
            renderItem={renderRecentPaper}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </Animatable.View>
      </ScrollView>

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
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 20, // Extra padding to avoid overlap with bottom nav
  },
  userInfoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#92E3A9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  statItemContainer: {
    alignItems: "center",
    backgroundColor: "#92E3A9", // Green background for stat items
    padding: 15,
    borderRadius: 10, // Rounded corners
    width: "30%", // Adjust width to fit three items with spacing
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  actionsContainer: {
    width: "100%",
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: "#FFD700", // Yellow background for action buttons
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  recentPapersContainer: {
    width: "100%",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  recentPaperItem: {
    backgroundColor: "#92E3A9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recentPaperText: {
    fontSize: 16,
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
