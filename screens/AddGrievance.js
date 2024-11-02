import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

// Sample user data
const users = [
  { id: "1", name: "Vasu Reddy", avatarUrl: require("../assets/profile1.png") },
  { id: "2", name: "Vasu", avatarUrl: require("../assets/profile1.png") },
];

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const { width } = Dimensions.get("window");

const AddGrievance = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Water Supply");
  const [assignedTo, setAssignedTo] = useState(users[0].id);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [attachments, setAttachments] = useState([]);

  const handleSubmit = () => {
    const assignedUser = users.find((user) => user.id === assignedTo);
    const newGrievance = {
      id: generateUUID(),
      location,
      title,
      profilePicture: assignedUser.avatarUrl, // Use the selected user's profile picture
      status: "Active",
      date: new Date().toLocaleDateString(),
      attachments,
      assignedTo: assignedUser.name,
      description,
      category,
    };

    navigation.navigate("GrievanceDetails", { grievance: newGrievance });

    // Reset fields after submission
    setTitle("");
    setCategory("Water Supply");
    setAssignedTo(users[0].id);
    setDescription("");
    setLocation("");
    setAttachments([]);
  };

  const handleAddAttachment = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted || !cameraPermission.granted) {
      Alert.alert("Permission to access camera and photos is required!");
      return;
    }

    // Ask the user for the type of upload
    const pickerChoice = await new Promise((resolve) => {
      Alert.alert("Upload Attachment", "Choose an option:", [
        { text: "Gallery", onPress: () => resolve("gallery") },
        { text: "Camera", onPress: () => resolve("camera") },
        { text: "Cancel", onPress: () => resolve(null), style: "cancel" },
      ]);
    });

    let result;
    if (pickerChoice === "gallery") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
    } else if (pickerChoice === "camera") {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
    }

    // Log the entire result object for debugging
    console.log("ImagePicker Result:", result); // Log the result

    // Check if an image was selected
    if (result && !result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0]; // Access the first asset
        console.log("Selected Image URI:", selectedAsset.uri); // Log the URI
        setAttachments((prevAttachments) => [
          ...prevAttachments,
          { uri: selectedAsset.uri },
        ]);
      } else {
        Alert.alert("No image selected. Please try again.");
      }
    } else {
      console.log("Image selection was cancelled or failed.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Grievance</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Inconsistent Water Supply Affecting Daily Life"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Water Supply" value="Water Supply" />
        <Picker.Item label="Road Maintenance" value="Road Maintenance" />
        <Picker.Item label="Waste Management" value="Waste Management" />
        <Picker.Item label="Electricity Supply" value="Electricity Supply" />
        <Picker.Item label="Public Safety" value="Public Safety" />
        <Picker.Item label="Community Services" value="Community Services" />
      </Picker>

      <Text style={styles.label}>Assigned To</Text>
      <Picker
        selectedValue={assignedTo}
        style={styles.picker}
        onValueChange={(itemValue) => setAssignedTo(itemValue)}
      >
        {users.map((user) => (
          <Picker.Item key={user.id} label={user.name} value={user.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Attachments</Text>
      <View style={styles.attachmentField}>
        <TouchableOpacity onPress={handleAddAttachment}>
          <Text style={styles.attachmentButtonText}>Add Attachment</Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {attachments.map((attachment, index) => (
            <Image
              key={index}
              source={{ uri: attachment.uri }}
              style={styles.attachmentImage}
              resizeMode="contain" // Use 'contain' to fit the image properly
            />
          ))}
        </ScrollView>
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        textAlignVertical="top"
        multiline
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: width * 0.04,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: width * 0.1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: width * 0.03,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  descriptionInput: {
    height: width * 0.2,
  },
  picker: {
    height: width * 0.13,
    marginBottom: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  attachmentField: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: width * 0.03,
    marginBottom: 12,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  attachmentButtonText: {
    color: "#007bff",
    marginBottom: 8,
  },
  attachmentImage: {
    width: width * 0.25,
    height: width * 0.25,
    marginHorizontal: 5,
  },
});

export default AddGrievance;
