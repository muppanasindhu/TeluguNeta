import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRequestOTP = () => {
    console.log("Request OTP:", phoneNumber);
    setPhoneNumber("");
    navigation.navigate("OtpVerification", { phoneNumber });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.subtitle}>Hello, welcome to Telugu Neta</Text>

          <Image
            source={require("../assets/Login.png")}
            style={styles.image}
            resizeMode="contain"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleRequestOTP}>
            <Text style={styles.buttonText}>Request OTP</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
    paddingBottom: height * 0.05,
  },
  subtitle: {
    position: "absolute",
    top: height * 0.02,
    left: width * 0.05,
    fontSize: width * 0.05,
    fontWeight: "300",
    marginBottom: height * 0.02,
    color: "#333",
    alignSelf: "flex-start",
  },
  image: {
    width: "80%",
    height: height * 0.3,
    marginBottom: height * 0.04,
  },
  input: {
    width: "90%",
    height: height * 0.06,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.03,
    fontSize: width * 0.045,
  },
  button: {
    width: "90%",
    backgroundColor: "blue",
    paddingVertical: height * 0.015,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.02,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
});

export default LoginScreen;
