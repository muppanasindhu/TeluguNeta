import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, CommonActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(
    require("../assets/Logo.png")
  );
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isEditingLanguage, setIsEditingLanguage] = useState(false);
  const [constituency, setConstituency] = useState("East Godavari");
  const [isEditingConstituency, setIsEditingConstituency] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem("profileImageUri");
        if (savedImageUri) {
          setProfileImage({ uri: savedImageUri });
        }
      } catch (error) {
        console.log("Failed to load profile image:", error);
      }
    };
    loadProfileImage();
  }, []);

  const handleImagePicker = async () => {
    // Request permissions for media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    // Request permissions for camera
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    // Check if permissions are granted
    if (!permissionResult.granted || !cameraPermission.granted) {
      Alert.alert("Permission to access camera and photos is required!");
      return; // Exit the function if permissions are not granted
    }

    // Show the alert with options
    Alert.alert("Select Profile Picture", "Choose an option", [
      {
        text: "Camera",
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
          });
          handleResponse(result);
        },
      },
      {
        text: "Gallery",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
          });
          handleResponse(result);
        },
      },
      // {
      //   text: "View Profile",
      //   onPress: () => setIsModalVisible(true),
      // },
      {
        text: "Cancel",
        onPress: () => {
          console.log("Profile picture selection canceled");
        },
        style: "cancel",
      },
    ]);
  };

  const handleResponse = async (response) => {
    if (response.canceled) {
      console.log("User cancelled image picker");
    } else if (response.assets && response.assets.length > 0) {
      const imageUri = response.assets[0].uri;
      setProfileImage({ uri: imageUri });
      await AsyncStorage.setItem("profileImageUri", imageUri);
    } else {
      console.log("Image selection was cancelled or failed.");
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "LoginPage" }],
            })
          );
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.cameraIconContainer}>
            <Feather name="camera" size={width * 0.06} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.fullName}>Veera Harish Shankar</Text>
        <Text style={styles.mobileNumber}>+91 9963289835</Text>
      </View>

      {/* Modal to view profile picture */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Image source={profileImage} style={styles.modalImage} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Profile Details Section */}
      <View style={styles.profileDetails}>
        {/* Language Picker */}
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Language</Text>
          {isEditingLanguage ? (
            <Picker
              selectedValue={selectedLanguage}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Hindi" value="Hindi" />
              <Picker.Item label="Telugu" value="Telugu" />
            </Picker>
          ) : (
            <Text style={styles.detailValue}>{selectedLanguage}</Text>
          )}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditingLanguage(!isEditingLanguage)}
          >
            <Feather
              name={isEditingLanguage ? "check" : "edit"}
              size={width * 0.05}
              color="#00796b"
            />
          </TouchableOpacity>
        </View>

        {/* Constituency Picker */}
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Constituency</Text>
          {isEditingConstituency ? (
            <Picker
              selectedValue={constituency}
              style={styles.picker}
              onValueChange={(itemValue) => setConstituency(itemValue)}
            >
              <Picker.Item label="East Godavari" value="East Godavari" />
              <Picker.Item label="West Godavari" value="West Godavari" />
              <Picker.Item label="Krishna" value="Krishna" />
            </Picker>
          ) : (
            <Text style={styles.detailValue}>{constituency}</Text>
          )}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditingConstituency(!isEditingConstituency)}
          >
            <Feather
              name={isEditingConstituency ? "check" : "edit"}
              size={width * 0.05}
              color="#00796b"
            />
          </TouchableOpacity>
        </View>

        {/* Footer Items */}
        <TouchableOpacity style={styles.footerItem}>
          <Feather name="file-text" size={width * 0.05} color="#00796b" />
          <Text style={styles.footerText}>Terms & Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Feather name="shield" size={width * 0.05} color="#00796b" />
          <Text style={styles.footerText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Feather name="trash-2" size={width * 0.05} color="#d9534f" />
          <Text style={styles.footerText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={width * 0.05} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd",
    padding: width * 0.05,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    borderWidth: 2,
    borderColor: "#00796b",
    marginBottom: height * 0.01,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#00796b",
    borderRadius: 20,
    padding: 5,
  },
  fullName: {
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  mobileNumber: {
    fontSize: width * 0.04,
    color: "#555",
  },
  profileDetails: {
    padding: width * 0.05,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height * 0.01,
  },
  detailLabel: {
    fontSize: width * 0.04,
    color: "#555",
  },
  detailValue: {
    fontSize: width * 0.04,
    color: "#333",
  },
  editButton: {
    padding: 5,
  },
  picker: {
    width: "60%",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.01,
  },
  footerText: {
    marginLeft: 10,
    fontSize: width * 0.04,
  },
  logoutButton: {
    flexDirection: "row", // Ensures the icon and text are aligned in a row
    alignItems: "center", 
    justifyContent:"center",// Centers the items vertically
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
    marginTop: height * 0.03,
  },
  logoutText: {
    color: "white",
    fontSize: width * 0.04,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 10,
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#00796b",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: width * 0.04,
  },
});

export default ProfileScreen;
