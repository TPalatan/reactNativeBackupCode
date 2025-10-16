import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Button, Divider } from "react-native-paper";

export default function PrivacyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>🔒 Privacy Policy</Text>

        <Divider style={styles.divider} />

        <Text style={styles.sectionTitle}>1. Data Collection</Text>
        <Text style={styles.paragraph}>
          We collect minimal personal data, such as your email address, to allow
          you to log in and synchronize your flashcards securely. Your study
          progress and preferences are stored locally on your device unless you
          choose to back them up.
        </Text>

        <Text style={styles.sectionTitle}>2. Use of Information</Text>
        <Text style={styles.paragraph}>
          Your information is used only to enhance your learning experience.
          We do not sell or share your data with third parties. Usage analytics
          may be collected anonymously to improve app performance.
        </Text>

        <Text style={styles.sectionTitle}>3. Data Security</Text>
        <Text style={styles.paragraph}>
          We use industry-standard encryption to keep your account secure. You
          are responsible for maintaining the confidentiality of your password.
        </Text>

        <Text style={styles.sectionTitle}>4. Your Rights</Text>
        <Text style={styles.paragraph}>
          You may request to delete your account and associated data at any
          time. Contact support or access this option in the app’s Settings.
        </Text>

        <Text style={styles.sectionTitle}>5. Updates</Text>
        <Text style={styles.paragraph}>
          This privacy policy may be updated periodically. We will notify you of
          significant changes via email or in-app alerts.
        </Text>

        <Divider style={styles.divider} />

        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Back to Settings
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: 50,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e293b",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
    marginTop: 16,
  },
  paragraph: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    marginTop: 4,
  },
  divider: {
    marginVertical: 16,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#2563eb",
  },
});
