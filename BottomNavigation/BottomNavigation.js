import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../Homepage/HomeScreen";
import StudyScreen from "../StudyScreen/StudyScreen";
import SettingsScreen from "../Settings/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function BottomNavigation({ user, onLogout }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarLabelStyle: { fontSize: 13 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Study") iconName = "book-open-page-variant";
          else if (route.name === "Settings") iconName = "cog";
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      {/* 🏠 Home Tab */}
      <Tab.Screen name="Home">
        {({ navigation }) => (
          <HomeScreen navigation={navigation} user={user} onLogout={onLogout} />
        )}
      </Tab.Screen>

      {/* 📘 Study Tab */}
      <Tab.Screen name="Study">
        {({ navigation }) => <StudyScreen navigation={navigation} />}
      </Tab.Screen>

      {/* ⚙️ Settings Tab */}
      <Tab.Screen name="Settings">
        {({ navigation }) => (
          <SettingsScreen
            navigation={navigation}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
