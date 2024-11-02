import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.titleText}>{item.title}</Text>
    <View style={styles.row}>
      <Image
        source={item.assignedTo.profilePicture}
        style={styles.profilePicture}
      />
      <View style={styles.statusDateContainer}>
        <Text style={styles.assignedText}>
          Assigned To: {item.assignedTo.name}
        </Text>
        <Text style={styles.statusText}>{item.status}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  </View>
);
const MyPage = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState("Active");

  // Initialize grievances state
  const [grievances, setGrievances] = useState([
    {
      id: "1",
      title: "Water Supply Issue",
      assignedTo: {
        name: "John Doe",
        profilePicture: require("../assets/profile1.png"),
      },
      status: "Active",
      date: "2024-10-25",
    },
    {
      id: "2",
      title: "Road Maintenance Needed",
      assignedTo: {
        name: "Jane Smith",
        profilePicture: require("../assets/profile2.png"),
      },
      status: "Resolved",
      date: "2024-10-24",
    },
  ]);

  // Check for a new grievance passed from the AddGrievance page
  useEffect(() => {
    if (route.params?.grievance) {
      setGrievances((prev) => [...prev, route.params.grievance]); // Append the new grievance
    }
  }, [route.params?.grievance]);

  if (!grievances || grievances.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No grievances available.</Text>
      </View>
    );
  }

  const filteredData = grievances.filter((item) => item.status === activeTab);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setActiveTab("Active")}
          style={styles.tab}
        >
          <Text
            style={
              activeTab === "Active" ? styles.activeTab : styles.inactiveTab
            }
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Resolved")}
          style={styles.tab}
        >
          <Text
            style={
              activeTab === "Resolved" ? styles.activeTab : styles.inactiveTab
            }
          >
            Resolved
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>No complaints found.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddGrievance")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: height * 0.015,
    backgroundColor: "#f0f0f0",
  },
  tab: {
    paddingVertical: height * 0.015,
  },
  activeTab: {
    fontWeight: "bold",
    fontSize: width * 0.04,
    color: "#000",
  },
  inactiveTab: {
    fontSize: width * 0.04,
    color: "#808080",
  },
  item: {
    padding: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  titleText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginBottom: height * 0.005,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.01,
  },
  profilePicture: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.065,
    marginRight: width * 0.03,
  },
  statusDateContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  assignedText: {
    fontSize: width * 0.035,
  },
  statusText: {
    fontSize: width * 0.035,
    color: "#f00",
  },
  dateText: {
    fontSize: width * 0.03,
    color: "#aaa",
  },
  addButton: {
    position: "absolute",
    bottom: height * 0.05,
    right: width * 0.05,
    width: width * 0.15,
    height: width * 0.15,
    backgroundColor: "#007BFF",
    borderRadius: width * 0.075,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
    fontSize: width * 0.07,
    color: "#fff",
  },
});

export default MyPage;
