import React from "react";

import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Text,
  TextInput,
  IconButton,
  Card,
  Button,
  ProgressBar,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function HomeScreen({ user }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigation = useNavigation();

  // 🏞️ Banner data
  const banners = [
    {
      id: 1,
      title: "Study Smarter, Not Harder 💡",
      image:
        "https://img.freepik.com/free-vector/learning-concept-illustration_114360-6194.jpg",
      color: "#fef3c7",
    },
    {
      id: 2,
      title: "Boost Your Memory Power 🧠",
      image:
        "https://img.freepik.com/free-vector/brainstorm-concept-illustration_114360-1767.jpg",
      color: "#cffafe",
    },
    {
      id: 3,
      title: "Explore New Topics 🌍",
      image:
        "https://img.freepik.com/free-vector/online-learning-concept_23-2148527837.jpg",
      color: "#e9d5ff",
    },
  ];

  // 🧠 Flashcard categories
  const flashcards = [
    {
      id: 1,
      title: "Science",
      color: "#c7d2fe",
      icon: "https://cdn-icons-png.flaticon.com/512/6165/6165230.png",
    },
    {
      id: 2,
      title: "Mathematics",
      color: "#fbcfe8",
      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      id: 3,
      title: "English",
      color: "#d1fae5",
      icon: "https://cdn-icons-png.flaticon.com/512/2942/2942666.png",
    },
    {
      id: 4,
      title: "History",
      color: "#fde68a",
      icon: "https://cdn-icons-png.flaticon.com/512/4021/4021654.png",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 🔍 Top Bar */}
      <View style={styles.topBar}>
        <TextInput
          placeholder="Search topics or flashcards..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          mode="outlined"
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
        />
        <IconButton
          icon="account-circle"
          size={36}
          onPress={() => navigation.navigate("Profile")}
        />
      </View>

      {/* 👋 Welcome Card */}
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Text style={styles.welcomeTitle}>
            Welcome back, {user.split("@")[0]} 👋
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Keep your streak alive and achieve your learning goals!
          </Text>
          <ProgressBar
            progress={0.7}
            color="#3b82f6"
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>70% Daily Goal Completed</Text>
        </Card.Content>
      </Card>

      {/* 🏞️ Banner Section */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.bannerScroll}
      >
        {banners.map((banner) => (
          <Card
            key={banner.id}
            style={[styles.bannerCard, { backgroundColor: banner.color }]}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>{banner.title}</Text>
              <Image source={{ uri: banner.image }} style={styles.bannerImage} />
            </View>
          </Card>
        ))}
      </ScrollView>

      {/* 📚 Flashcard Categories */}
      <Text style={styles.sectionTitle}>Study Categories</Text>
      <View style={styles.flashcardGrid}>
        {flashcards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[styles.flashcard, { backgroundColor: card.color }]}
            onPress={() => navigation.navigate("CategoryDetail", { id: card.id })}
          >
            <Image source={{ uri: card.icon }} style={styles.flashIcon} />
            <Text style={styles.flashTitle}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 📅 Continue Learning Section */}
      <Text style={styles.sectionTitle}>Continue Learning</Text>
      <Card style={styles.continueCard}>
        <Card.Content>
          <View style={styles.continueRow}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5974/5974636.png",
              }}
              style={styles.continueImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.continueTitle}>Science - Chapter 2</Text>
              <Text style={styles.continueSubtitle}>Last studied: 2 hrs ago</Text>
              <ProgressBar progress={0.4} color="#3b82f6" style={{ marginTop: 5 }} />
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* 🖼️ Bottom Illustration */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3898/3898672.png",
        }}
        style={styles.bottomImage}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginRight: 5,
  },
  welcomeCard: {
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: "#64748b",
    marginTop: 5,
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 10,
  },
  progressText: {
    fontSize: 13,
    color: "#334155",
    marginTop: 4,
  },
  bannerScroll: {
    marginBottom: 20,
  },
  bannerCard: {
    width: width - 60,
    borderRadius: 20,
    marginRight: 15,
    elevation: 3,
    overflow: "hidden",
  },
  bannerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    width: "60%",
  },
  bannerImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#0f172a",
  },
  flashcardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  flashcard: {
    width: "48%",
    height: 140,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    elevation: 3,
  },
  flashIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
  },
  flashTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  continueCard: {
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 3,
  },
  continueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  continueImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 15,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  continueSubtitle: {
    fontSize: 13,
    color: "#64748b",
  },
  bottomImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: 30,
    opacity: 0.5,
  },
});
