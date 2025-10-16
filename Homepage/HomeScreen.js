import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, TextInput, IconButton, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // 👈 Add this import

export default function HomeScreen({ user }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigation = useNavigation(); // 👈 Initialize navigation

  return (
    <View style={styles.container}>
      {/* 🔍 Top Bar */}
      <View style={styles.topBar}>
        <TextInput
          placeholder="Search flashcards..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          mode="outlined"
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
        />
        <IconButton
          icon="account-circle"
          size={36}
          onPress={() => navigation.navigate("Profile")} // 👈 Navigate to ProfileScreen
        />
      </View>

      {/* 🏡 Welcome Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Welcome back, {user.split("@")[0]} 👋</Text>
          <Text style={styles.subtitle}>Ready to study today?</Text>
        </Card.Content>
      </Card>

      {/* 🖼️ Illustration */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/6165/6165230.png",
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginRight: 5,
  },
  card: {
    borderRadius: 16,
    elevation: 3,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 60,
    opacity: 0.4,
  },
});
