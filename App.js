import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./LoginForm/LoginScreen";
import CreateAccountScreen from "./CreateAccountScreen/CreateAccountScreen";
import BottomNavigation from "./BottomNavigation/BottomNavigation";
import ProfileScreen from "./Profile/ProfileScreen";
import PrivacyScreen from "./Privacy/PrivacyScreen"; // 👈 Added import

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <PaperProvider>
      <NavigationContainer>
        {!user ? (
          // 🔐 Authentication Stack
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen {...props} onLogin={(email) => setUser(email)} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccountScreen}
            />
          </Stack.Navigator>
        ) : (
          // 🏠 Main App Stack (Tabs + Profile + Privacy)
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main">
              {(props) => (
                <BottomNavigation
                  {...props}
                  user={user}
                  onLogout={() => setUser(null)}
                />
              )}
            </Stack.Screen>

            {/* 👤 Profile Screen */}
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                presentation: "modal",
              }}
            />

            {/* 🔒 Privacy Policy Screen */}
            <Stack.Screen
              name="Privacy"
              component={PrivacyScreen}
              options={{
                headerShown: true,
                headerTitle: "Privacy Policy",
                headerBackTitleVisible: false,
                headerTintColor: "#2563eb",
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
