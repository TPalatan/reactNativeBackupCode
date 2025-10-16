import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
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

// 🔄 FlipCard Component
const FlipCard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipCard = () => {
    Animated.spring(animatedValue, {
      toValue: flipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] };

  return (
    <View style={styles.flipCardContainer}>
      <TouchableOpacity onPress={flipCard} activeOpacity={0.9}>
        <View>
          {/* FRONT */}
          <Animated.View style={[styles.flipCard, frontAnimatedStyle, { zIndex: flipped ? 0 : 1 }]}>
            <Text style={styles.cardTitle}>Question</Text>
            <Text style={styles.cardText}>{question}</Text>
            <Text style={styles.tapText}>Tap to Flip</Text>
          </Animated.View>

          {/* BACK */}
          <Animated.View
            style={[
              styles.flipCard,
              styles.flipCardBack,
              backAnimatedStyle,
              { position: "absolute", top: 0, zIndex: flipped ? 1 : 0 },
            ]}
          >
            <Text style={styles.cardTitle}>Answer</Text>
            <Text style={styles.cardText}>{answer}</Text>
            <Text style={styles.tapText}>Tap to Flip Back</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function StudyScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flashcards, setFlashcards] = useState([]);

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
    } catch (error) {
      Alert.alert("Error", "Something went wrong while uploading PDF");
      console.error(error);
    }
  };

  const addFlashcard = () => {
    if (!question.trim() || !answer.trim()) {
      Alert.alert("⚠️ Missing Fields", "Please enter both a question and an answer.");
      return;
    }

    const newCard = { id: Date.now().toString(), question, answer };
    setFlashcards([...flashcards, newCard]);
    setQuestion("");
    setAnswer("");
    Alert.alert("✅ Added", "New flashcard has been added!");
  };

  const clearFlashcards = () => {
    if (flashcards.length === 0) {
      Alert.alert("ℹ️ No Flashcards", "There are no flashcards to clear.");
      return;
    }

    Alert.alert("🗑️ Confirm", "Are you sure you want to clear all flashcards?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Clear All",
        onPress: () => {
          setFlashcards([]);
          Alert.alert("✅ Cleared", "All flashcards have been removed.");
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
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

          {/* ✏️ Add new flashcard (moved up) */}
          <Text style={styles.flashcardHeader}>🧠 Add New Flashcard</Text>

          <TextInput
            mode="outlined"
            label="Question"
            placeholder="Enter your question..."
            value={question}
            onChangeText={setQuestion}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Answer"
            placeholder="Enter the answer..."
            value={answer}
            onChangeText={setAnswer}
            style={styles.input}
            multiline
          />

          {/* ➕ Add + 🗑️ Clear buttons */}
          <View style={styles.buttonRow}>
            <Button mode="contained" style={styles.addButton} onPress={addFlashcard}>
              ➕ Add Flashcard
            </Button>
            <Button mode="outlined" style={styles.clearButton} onPress={clearFlashcards}>
              🗑️ Clear All
            </Button>
          </View>

          {/* 🧩 Flashcard List */}
          {flashcards.length > 0 && (
            <>
              <Text style={styles.flashcardHeader}>📘 Your Flashcards</Text>
              {flashcards.map((card) => (
                <FlipCard key={card.id} question={card.question} answer={card.answer} />
              ))}
            </>
          )}

          {/* 📚 Study Sets */}
          <Text style={styles.flashcardHeader}>📚 Study Sets</Text>
          <FlatList
            data={filteredSets}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafb",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  searchBar: {
    marginBottom: 10,
  },
  uploadButton: {
    marginBottom: 20,
    backgroundColor: "#2563eb",
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

  // Flashcards
  flashcardHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#1e293b",
  },
  input: {
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#2563eb",
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    flex: 1,
    borderColor: "#ef4444",
  },
  flipCardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  flipCard: {
    width: 280,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    borderRadius: 16,
    backfaceVisibility: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 16,
  },
  flipCardBack: {
    backgroundColor: "#1e40af",
    position: "absolute",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: "#f1f5f9",
    textAlign: "center",
  },
  tapText: {
    fontSize: 12,
    color: "#cbd5e1",
    marginTop: 12,
  },
});
