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
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const OtpVerification = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState("");

  const displayPhoneNumber = phoneNumber
    ? `91+${phoneNumber}`
    : "Invalid phone number";
  // This navigation.reset approach clears the previous screens from the stack and sets MainTabs as the root screen, effectively disabling navigation back to the OTP verification screen.
  const handleVerifyOTP = () => {
    console.log("Verify OTP:", otp);
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
    setOtp("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>
              A 4-digit code has been sent to {displayPhoneNumber}
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/Login.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
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
  innerContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.05,
  },
  textContainer: {
    marginTop: height * 0.02,
    width: "100%",
    alignItems: "flex-start",
  },
  subtitle: {
    fontSize: width * 0.05,
    fontWeight: "400",
    color: "#333",
    marginBottom: height * 0.02,
  },
  imageContainer: {
    width: "80%",
    alignSelf: "center",
    marginVertical: height * 0.05,
  },
  image: {
    width: "100%",
    height: height * 0.3,
  },
  inputContainer: {
    width: "100%",
    marginBottom: height * 0.03,
  },
  input: {
    width: "100%",
    height: height * 0.06,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.045,
    color: "#333",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: height * 0.015,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.02,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
});

export default OtpVerification;
