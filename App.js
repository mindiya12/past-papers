import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import FacultyDetailsScreen from "./screens/FacultyDetailsScreen";
import SearchScreen from "./screens/SearchScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DownloadsScreen from "./screens/DownloadsScreen";
import SemesterSelection from "./screens/SemesterSelectionScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import VerifyOTPScreen from "./screens/VerifyOTPScreen";
import CreateNewPasswordScreen from "./screens/CreateNewPasswordScreen";
import PasswordUpdatedScreen from "./screens/PasswordUpdatedScreen";
import PastPapersScreen from "./screens/PastPapersScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FacultyDegrees" component={FacultyDetailsScreen} />
        <Stack.Screen name="SemesterSelection" component={SemesterSelection} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Downloads" component={DownloadsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="PastPapers"
          component={PastPapersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyOTP"
          component={VerifyOTPScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateNewPassword"
          component={CreateNewPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PasswordUpdated"
          component={PasswordUpdatedScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
