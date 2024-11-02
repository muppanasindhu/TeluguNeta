import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

const HomeScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/Home.png")} style={styles.image} />
      </View>

      {/* Added instructional text */}
      <Text style={styles.instructionText}>
        Choose your language to continue
      </Text>

      <View style={styles.languageOptions}>
        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => handleLanguageSelection("English")}
        >
          <View style={styles.radioButtonOuter}>
            {selectedLanguage === "English" && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
          <Text style={styles.languageOption}>English</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => handleLanguageSelection("Telugu")}
        >
          <View style={styles.radioButtonOuter}>
            {selectedLanguage === "Telugu" && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
          <Text style={styles.languageOption}>Telugu</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Continue"
        onPress={() => navigation.navigate("LoginPage")}
        disabled={!selectedLanguage}
        color="#007BFF"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: width * 0.05, // Horizontal padding as 5% of screen width
  },
  imageContainer: {
    marginBottom: height * 0.05, // Margin as 5% of screen height
  },
  image: {
    width: width * 0.7, // Width as 70% of screen width
    height: height * 0.3, // Height as 30% of screen height
    resizeMode: "contain",
  },
  instructionText: {
    fontSize: width * 0.05, // Font size as 5% of screen width
    fontWeight: "500",
    marginBottom: height * 0.02, // Margin as 2% of screen height
    textAlign: "center",
  },
  languageOptions: {
    marginBottom: height * 0.03, // Margin as 3% of screen height
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.01, // Vertical margin as 1% of screen height
  },
  radioButtonOuter: {
    height: width * 0.05, // Outer circle size as 5% of screen width
    width: width * 0.05,
    borderRadius: width * 0.025,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.03, // Margin as 3% of screen width
  },
  radioButtonInner: {
    height: width * 0.025, // Inner circle size as 2.5% of screen width
    width: width * 0.025,
    borderRadius: width * 0.0125,
    backgroundColor: "#000",
  },
  languageOption: {
    fontSize: width * 0.045, // Font size as 4.5% of screen width
  },
});
