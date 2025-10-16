import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { TextInput, Button, Text, Card, Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@email.com");
  const [bio, setBio] = useState("Passionate learner and flashcard enthusiast!");
  const [profileImage, setProfileImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("✅ Profile updated successfully!");
    }, 1000);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={pickImage}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
              ) : (
                <Avatar.Icon size={100} icon="account" />
              )}
            </TouchableOpacity>
            <Text style={styles.changeText}>Change Profile Picture</Text>
          </View>

          <TextInput
            label="Full Name"
            mode="outlined"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            label="Bio"
            mode="outlined"
            multiline
            numberOfLines={3}
            value={bio}
            onChangeText={setBio}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleSave}
            loading={saving}
            style={styles.saveButton}
          >
            Save Changes
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "100%",
    borderRadius: 16,
    elevation: 3,
    paddingVertical: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e2e8f0",
  },
  changeText: {
    color: "#2563eb",
    fontSize: 14,
    marginTop: 8,
  },
  input: {
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 10,
  },
});
