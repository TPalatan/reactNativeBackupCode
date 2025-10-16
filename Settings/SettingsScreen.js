import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Button,
  Text,
  Card,
  List,
  Divider,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // ✅ ensures navigation is always available

export default function SettingsScreen({ navigation: propNavigation, onLogout }) {
  // fallback navigation to avoid "undefined" error
  const navigation = propNavigation || useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🧑 Profile Section */}
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Image
            size={80}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            }}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@email.com</Text>
          </View>
        </Card.Content>
      </Card>

      {/* ⚙️ Settings List */}
      <Card style={styles.settingsCard}>
        <List.Section>
          <List.Subheader>Preferences</List.Subheader>

          {/* 🔔 Notifications */}
          <List.Item
            title="Notifications"
            description="Manage push alerts and reminders"
            left={(props) => <List.Icon {...props} icon="bell-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate("Notifications")} // ✅ updated
          />
          <Divider />

          {/* 🎨 Theme */}
          <List.Item
            title="Theme"
            description="Switch between light and dark mode"
            left={(props) => <List.Icon {...props} icon="palette-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => alert("Theme settings coming soon")}
          />
          <Divider />

          {/* 🔒 Privacy */}
          <List.Item
            title="Privacy"
            description="View privacy policy and data usage"
            left={(props) => <List.Icon {...props} icon="lock-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate("Privacy")}
          />
        </List.Section>
      </Card>

      {/* 🚪 Logout Button */}
      <Button
        mode="contained"
        onPress={onLogout}
        style={styles.logoutButton}
        labelStyle={{ fontWeight: "bold" }}
      >
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  profileCard: {
    width: "100%",
    borderRadius: 16,
    elevation: 3,
    marginBottom: 20,
    backgroundColor: "#ffffff",
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
  },
  profileEmail: {
    fontSize: 14,
    color: "#64748b",
  },
  settingsCard: {
    width: "100%",
    borderRadius: 16,
    elevation: 2,
    marginBottom: 30,
    backgroundColor: "#ffffff",
  },
  logoutButton: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#ef4444",
  },
});
