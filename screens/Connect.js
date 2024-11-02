//
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ConnectScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const events = [
    {
      id: "1",
      name: "Tech Conference",
      date: "Nov 10, 2024",
      location: "San Francisco, CA",
      image: require("../assets/postImage1.png"),
    },
    {
      id: "2",
      name: "Music Fest",
      date: "Nov 15, 2024",
      location: "Los Angeles, CA",
      image: require("../assets/postImage1.png"),
    },
    {
      id: "3",
      name: "Art Expo",
      date: "Nov 20, 2024",
      location: "New York, NY",
      image: require("../assets/postImage1.png"),
    },
  ];

  const appointments = [
    {
      id: "1",
      name: "John Doe",
      date: "Oct 28, 2024",
      time: "10:00 AM",
      profilePic: require("../assets/profile1.png"),
    },
    {
      id: "2",
      name: "Jane Smith",
      date: "Oct 29, 2024",
      time: "2:00 PM",
      profilePic: require("../assets/profile2.png"),
    },
  ];

  // Check if there are new appointment details
  if (route.params) {
    const { name, profilePic, date, time } = route.params;
    appointments.push({
      id: `${appointments.length + 1}`,
      name,
      date,
      time,
      profilePic,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Upcoming Events</Text>
      <FlatList
        data={events}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Image source={item.image} style={styles.eventImage} />
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
            <Text style={styles.eventLocation}>{item.location}</Text>
          </View>
        )}
      />

      <Text style={styles.heading}>Appointments</Text>
      {appointments.map((appointment) => (
        <View key={appointment.id} style={styles.appointmentCard}>
          <Image source={appointment.profilePic} style={styles.profilePic} />
          <View>
            <Text style={styles.appointmentName}>{appointment.name}</Text>
            <Text
              style={styles.appointmentDateTime}
            >{`${appointment.date} at ${appointment.time}`}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("BookAppointment")}
      >
        <Text style={styles.createButtonText}>Create New Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
    backgroundColor: "#F8F8F8",
  },
  heading: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#333",
    marginVertical: height * 0.02,
  },
  eventCard: {
    width: width * 0.5,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: width * 0.04,
    marginHorizontal: width * 0.02,
    alignItems: "center",
    elevation: 2,
  },
  eventImage: {
    width: width * 0.35,
    height: width * 0.25,
    borderRadius: 8,
    marginBottom: height * 0.01,
  },
  eventName: {
    fontSize: width * 0.045,
    fontWeight: "600",
    marginBottom: height * 0.005,
    textAlign: "center",
  },
  eventDate: {
    fontSize: width * 0.035,
    color: "#888",
    textAlign: "center",
  },
  eventLocation: {
    fontSize: width * 0.035,
    color: "#888",
    textAlign: "center",
  },
  appointmentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: width * 0.03,
    borderRadius: 8,
    marginBottom: height * 0.01,
    elevation: 2,
  },
  profilePic: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    marginRight: width * 0.03,
  },
  appointmentName: {
    fontSize: width * 0.045,
    fontWeight: "600",
  },
  appointmentDateTime: {
    fontSize: width * 0.035,
    color: "#888",
  },
  createButton: {
    backgroundColor: "#007BFF",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.3,
    borderRadius: 8,
    alignItems: "center",
    marginTop: height * 0.02,
    alignSelf: "center",
  },
  createButtonText: {
    fontSize: width * 0.045,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ConnectScreen;
