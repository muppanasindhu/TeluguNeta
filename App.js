import * as React from "react";
// import { useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icons or any other icon set
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OtpVerification from "./screens/OtpVerification";
import Home from "./screens/Home";
import Grievance from "./screens/Grievance";
import Connect from "./screens/Connect";
import Profile from "./screens/Profile";
import AddGrievance from "./screens/AddGrievance";
import GrievanceDetails from "./screens/GrievanceDetails";
import BookAppointment from "./screens/BookAppointment ";
// import ConnectScreen from './screens/Connect'
// import LoginScreen from './screens/LoginScreen'
import { useState } from "react";
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create a separate function for the Tab Navigator
const TabNavigator = () => {
  // const [grievances, setGrievances] = useState([]);

  // const handleAddGrievance = (newGrievance) => {
  //   setGrievances([...grievances, newGrievance]);
  // };
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Grievance"
        component={Grievance}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="report-problem" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Connect"
        component={Connect}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="connect-without-contact" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Choose Your Language" }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OtpVerification}
          options={{ title: "OTP Verification" }}
        />
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator} // Set the TabNavigator as a screen
          options={{ headerShown: false }} // Hide header for tabs
        />
        <Stack.Screen name="AddGrievance" component={AddGrievance} />
        <Stack.Screen name="GrievanceDetails" component={GrievanceDetails} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="BookAppointment" component={BookAppointment} />
        <Stack.Screen name="Connect" component={Connect} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
