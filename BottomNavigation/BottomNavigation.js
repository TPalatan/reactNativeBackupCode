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
      <Tab.Screen name="Home">
        {() => <HomeScreen user={user} onLogout={onLogout} />}
      </Tab.Screen>
      <Tab.Screen name="Study" component={StudyScreen} />
      <Tab.Screen name="Settings">
        {() => <SettingsScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>

    
  );
}
