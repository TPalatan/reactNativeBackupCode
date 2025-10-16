import React, { useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Card, Text, Button, ProgressBar, TextInput } from "react-native-paper";

const sampleSets = [
  {
    id: "1",
    title: "Biology Basics",
    description: "Introduction to cells, genetics, and evolution.",
    progress: 0.4,
  },
  {
    id: "2",
    title: "World History",
    description: "Ancient civilizations and key historical events.",
    progress: 0.7,
  },
  {
    id: "3",
    title: "Mathematics",
    description: "Algebra, geometry, and trigonometry fundamentals.",
    progress: 0.2,
  },
];

export default function StudyScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSets = sampleSets.filter((set) =>
    set.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled) return;

      const file = result.assets[0];
      Alert.alert(
        "📘 PDF Uploaded",
        `File: ${file.name}\nSize: ${(file.size / 1024 / 1024).toFixed(2)} MB`
      );

      // Later: send PDF to your backend or local processor to generate flashcards
    } catch (error) {
      Alert.alert("Error", "Something went wrong while uploading PDF");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search bar */}
      <TextInput
        mode="outlined"
        placeholder="Search study sets..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
        left={<TextInput.Icon icon="magnify" />}
      />

      {/* 📤 Upload PDF Button */}
      <Button
        mode="contained"
        icon="file-upload"
        onPress={handleUploadPDF}
        style={styles.uploadButton}
      >
        Upload PDF to Generate Flashcards
      </Button>

      {/* 📚 List of study sets */}
      <FlatList
        data={filteredSets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>

              <View style={styles.progressContainer}>
                <ProgressBar
                  progress={item.progress}
                  color="#2563eb"
                  style={styles.progressBar}
                />
                <Text style={styles.progressText}>
                  {Math.round(item.progress * 100)}% Complete
                </Text>
              </View>

              <Button
                mode="contained"
                style={styles.button}
                onPress={() => Alert.alert("📖 Studying", `Starting ${item.title}...`)}
              >
                Start Studying
              </Button>
            </Card.Content>
          </Card>
        )}
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
  searchBar: {
    marginBottom: 10,
  },
  uploadButton: {
    marginBottom: 20,
    backgroundColor: "#2563eb",
  },
  listContainer: {
    paddingBottom: 80,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  description: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  button: {
    marginTop: 10,
  },
});
