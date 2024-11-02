import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const BookAppointment = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null); // New state for selected time slot
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const timeSlots = [
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: false },
    { time: "11:00 AM", available: true },
    { time: "1:00 PM", available: false },
    { time: "3:00 PM", available: true },
    { time: "4:00 PM", available: true },
  ];
  
  const persons = [
    {
      label: "John Doe",
      value: "john",
      profilePic: require("../assets/profile1.png"),
    },
    {
      label: "Jane Smith",
      value: "jane",
      profilePic: require("../assets/profile2.png"),
    },
  ];

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const storedDetails = await AsyncStorage.getItem("appointmentDetails");
        if (storedDetails) {
          const details = JSON.parse(storedDetails);
          setSelectedPerson(details.selectedPerson);
          setSelectedDate(new Date(details.selectedDate));
          setSelectedTime(details.selectedTime);
        }
      } catch (error) {
        console.error("Failed to load appointment details.", error);
      }
    };

    fetchAppointmentDetails();
  }, []);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const handleBookAppointment = async () => {
    const selectedPersonDetails = persons.find(
      (person) => person.value === selectedPerson
    );
    if (selectedPersonDetails && selectedTime) {
      const appointmentDetails = {
        selectedPerson,
        selectedDate: selectedDate.toISOString(), // Store date as ISO string
        selectedTime,
      };

      // Save to Async Storage
      try {
        await AsyncStorage.setItem("appointmentDetails", JSON.stringify(appointmentDetails));
      } catch (error) {
        console.error("Failed to save appointment details.", error);
      }

      navigation.navigate("Connect", {
        name: selectedPersonDetails.label,
        profilePic: selectedPersonDetails.profilePic,
        date: selectedDate.toDateString(),
        time: selectedTime,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Book Appointment</Text>

      <Text style={styles.label}>Schedule with</Text>
      <Dropdown
        style={styles.dropdown}
        data={persons}
        labelField="label"
        valueField="value"
        placeholder="Select a person"
        value={selectedPerson}
        onChange={(item) => setSelectedPerson(item.value)}
      />
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.datePickerContainer}
      >
        <Text style={styles.datePickerText}>{selectedDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Text style={styles.instructions}>
        Available slots are highlighted in teal, while unavailable slots are
        highlighted in red.
      </Text>
      <Text style={styles.sectionHeading}>Available Time Slots</Text>
      <FlatList
        data={timeSlots}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.time}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.timeSlot,
              item.available ? styles.available : styles.notAvailable,
              selectedTime === item.time && styles.selectedTime,
              { width: width * 0.25, height: width * 0.25 },
            ]}
            onPress={() => item.available && setSelectedTime(item.time)}
          >
            <Text
              style={[
                styles.timeSlotText,
                !item.available && styles.notAvailableText,
              ]}
            >
              {item.time}
            </Text>
          </TouchableOpacity>
        )}
      />
      {selectedTime && (
        <View style={styles.selectedTimeContainer}>
          <Text style={styles.selectedTimeHeading}>Selected Time Slot</Text>
          <Text style={styles.selectedTimeText}>{selectedTime}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={handleBookAppointment}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: height * 0.02,
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginBottom: height * 0.01,
  },
  dropdown: {
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 10,
  },
  datePickerContainer: {
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 10,
  },
  datePickerText: {
    fontSize: width * 0.04,
    textAlign: "center",
  },
  instructions: {
    fontSize: width * 0.035,
    marginBottom: height * 0.015,
    color: "#666",
    textAlign: "center",
  },
  sectionHeading: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginBottom: height * 0.01,
  },
  timeSlot: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: width * 0.01,
    elevation: 3,
  },
  available: {
    backgroundColor: "#4db6ac",
    borderColor: "#00796b",
    borderWidth: 1,
  },
  notAvailable: {
    backgroundColor: "#ffebee",
    borderColor: "#d32f2f",
    borderWidth: 1,
  },
  timeSlotText: {
    fontSize: width * 0.04,
    textAlign: "center",
    color: "#fff",
  },
  notAvailableText: {
    color: "#d32f2f",
  },
  selectedTimeContainer: {
    marginTop: height * 0.02,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    alignItems: "center",
  },
  selectedTimeHeading: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#00796b",
  },
  selectedTimeText: {
    fontSize: width * 0.04,
    color: "#00796b",
  },
  bookButton: {
    backgroundColor: "#00796b",
    borderRadius: 8,
    paddingVertical: height * 0.02,
    marginTop: height * 0.02,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: width * 0.045,
    textAlign: "center",
  },
});

export default BookAppointment;
