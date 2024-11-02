// /screens/SplashScreen.js
import React, { useEffect } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); // Navigate to Home after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clear timer on unmount
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/SplashScreen.png")}
        style={styles.image}
      />
      {/* <Text style={styles.text}>Welcome to My App</Text> */}
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 300,
    // marginBottom: 20,
  },
  //   text: {
  //     fontSize: 24,
  //     fontWeight: 'bold',
  //     color: '#333',
  //   },
});
