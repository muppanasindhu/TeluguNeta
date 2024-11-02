import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const { width, height } = Dimensions.get("window");

const GrievanceDetails = ({ route }) => {
  const { grievance } = route.params; // Get grievance data from navigation params
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: "1",
      name: "Venkat",
      text: "Good Morning Vasu Garu, can you please follow up and get the issue resolved.",
      timestamp: "Friday 2:20pm",
    },
    {
      id: "2",
      name: "Adireddy Vasu",
      text: "Hi Venkat, sure. I will follow up with the team concerned and get this resolved.",
      timestamp: "Friday 2:20pm",
    },
  ]);
  const [attachments, setAttachments] = useState(grievance.attachments || []); // Initialize with existing attachments

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObject = {
        id: String(comments.length + 1),
        name: "Your Name", // Replace with actual user name if available
        text: newComment,
        timestamp: new Date().toLocaleString(),
      };
      setComments([...comments, newCommentObject]);
      setNewComment("");
    }
  };

  const combinedData = [
    { id: "header", type: "header" },
    { id: "title", title: grievance.title, type: "title" },
    { id: "category", text: grievance.category, type: "category" },
    { id: "assignedTo", name: grievance.assignedTo, type: "assignedTo" },
    { id: "description", text: grievance.description, type: "description" },
    { id: "attachmentsTitle", title: "Attachments", type: "attachmentsTitle" },
    ...attachments.map((attachment, index) => ({
      id: `attachment${index + 1}`,
      image: attachment.uri,
      type: "attachment",
    })),
    { id: "commentsTitle", title: "Comments", type: "commentsTitle" },
    ...comments.map((comment) => ({ ...comment, type: "comment" })),
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "header":
        return (
          <View style={styles.header}>
            <Text style={styles.title}>Grievance Details</Text>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.buttonText}>...</Text>
            </TouchableOpacity>
          </View>
        );
      case "title":
        return <Text style={styles.grievanceTitle}>{item.title}</Text>;
      case "category":
        return <Text style={styles.categoryText}>Category: {item.text}</Text>;
      case "assignedTo":
        return (
          <Text style={styles.assignedToText}>Assigned To: {item.name}</Text>
        );
      case "description":
        return (
          <Text style={styles.descriptionText}>Description: {item.text}</Text>
        );
      case "attachmentsTitle":
        return <Text style={styles.attachmentsTitle}>{item.title}</Text>;
      case "attachment":
        return (
          <View style={styles.attachmentContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.attachmentImage}
              resizeMode="contain"
            />
          </View>
        );
      case "commentsTitle":
        return <Text style={styles.commentsTitle}>{item.title}</Text>;
      case "comment":
        return (
          <View style={styles.comment}>
            <Image
              source={require("../assets/profile1.png")}
              style={styles.avatar}
            />
            <View style={styles.commentContent}>
              <Text style={styles.commentName}>{item.name}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
              <Text style={styles.commentTimestamp}>{item.timestamp}</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.commentInput}>
        <TextInput
          style={styles.commentInputBox}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
    backgroundColor: "#f0f4f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
    backgroundColor: "#0056b3",
    padding: height * 0.02,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#ffffff",
  },
  menuButton: {
    padding: width * 0.02,
  },
  buttonText: {
    fontSize: width * 0.05,
    color: "#ffffff",
  },
  grievanceTitle: {
    fontSize: width * 0.055,
    fontWeight: "bold",
    marginBottom: height * 0.01,
    color: "#333",
  },
  categoryText: {
    fontSize: width * 0.045,
    marginBottom: height * 0.01,
    color: "#007bff",
  },
  assignedToText: {
    fontSize: width * 0.045,
    marginBottom: height * 0.01,
    color: "#555",
  },
  descriptionText: {
    fontSize: width * 0.045,
    marginBottom: height * 0.02,
    lineHeight: width * 0.055,
    color: "#333",
  },
  attachmentsTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.01,
    color: "#0056b3",
  },
  attachmentContainer: {
    width: "100%",
    height: height * 0.25, // Adjust height as needed
    overflow: "hidden", // Ensure no overflow
    borderRadius: 10,
    marginBottom: height * 0.01,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  attachmentImage: {
    width: "100%",
    height: "100%", // Make sure the image fills the container
  },
  commentsTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    color: "#0056b3",
  },
  comment: {
    flexDirection: "row",
    marginBottom: height * 0.015,
    alignItems: "flex-start",
    padding: width * 0.03,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  avatar: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 50,
    marginRight: width * 0.02,
  },
  commentContent: {
    flex: 1,
  },
  commentName: {
    fontWeight: "bold",
    color: "#333",
  },
  commentText: {
    marginTop: height * 0.005,
    color: "#555",
  },
  commentTimestamp: {
    marginTop: height * 0.005,
    fontSize: width * 0.035,
    color: "#aaa",
  },
  commentInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.02,
    padding: width * 0.02,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  commentInputBox: {
    flex: 1,
    padding: width * 0.02,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendButton: {
    padding: width * 0.02,
  },
  sendButtonText: {
    fontWeight: "bold",
    color: "#0056b3",
  },
  listContainer: {
    paddingBottom: height * 0.1,
  },
});

export default GrievanceDetails;
