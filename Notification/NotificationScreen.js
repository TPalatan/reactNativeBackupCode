import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Switch } from "react-native";
import { Text, Card, List, Divider, Button } from "react-native-paper";

export default function NotificationScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🔔 Notification Settings</Text>

      <Card style={styles.card}>
        <List.Section>
          <List.Subheader style={styles.subheader}>Push Notifications</List.Subheader>

          <List.Item
            title="App Notifications"
            description="Receive alerts and updates within the app"
            left={(props) => <List.Icon {...props} icon="bell-outline" />}
            right={() => (
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: "#cbd5e1", true: "#2563eb" }}
              />
            )}
          />
          <Divider />

          <List.Item
            title="Study Reminders"
            description="Daily reminders to review your flashcards"
            left={(props) => <List.Icon {...props} icon="calendar-clock" />}
            right={() => (
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
                trackColor={{ false: "#cbd5e1", true: "#2563eb" }}
              />
            )}
          />
          <Divider />

          <List.Item
            title="Email Notifications"
            description="Get progress summaries via email"
            left={(props) => <List.Icon {...props} icon="email-outline" />}
            right={() => (
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: "#cbd5e1", true: "#2563eb" }}
              />
            )}
          />
        </List.Section>
      </Card>

      <Button
        mode="contained"
        icon="content-save"
        style={styles.saveButton}
        onPress={() => alert("✅ Preferences saved successfully!")}
      >
        Save Changes
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    borderRadius: 16,
    elevation: 3,
    backgroundColor: "#ffffff",
    marginBottom: 30,
  },
  subheader: {
    fontWeight: "bold",
    color: "#2563eb",
  },
  saveButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 6,
  },
});
