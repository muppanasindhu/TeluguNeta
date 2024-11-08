import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
  Share,
} from "react-native";

const { width } = Dimensions.get("window");

const Post = ({ imageSource, profilePictureSource, postData }) => {
  const [likes, setLikes] = useState(postData.statistic1);
  const [shares, setShares] = useState(postData.statistic3);
  const [buttonLiked, setButtonLiked] = useState(false);
  const [showLikeButton, setShowLikeButton] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // State to track if the post is saved

  const handleLike = () => {
    if (buttonLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
      setShowLikeButton(true);
      setTimeout(() => setShowLikeButton(false), 1000);
    }
    setButtonLiked(!buttonLiked);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this post by ${postData.name}: ${postData.content}`,
        url: imageSource,
      });
      setShares(shares + 1);
    } catch (error) {
      alert("Error sharing the post: " + error.message);
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length,
          text: newComment,
          name: "User",
          profilePicture: profilePictureSource,
        },
      ]);
      setNewComment("");
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved); // Toggle saved state
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={profilePictureSource} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{postData.name}</Text>
            <Image
              source={require("../assets/Official_Icon.png")}
              style={styles.officialIcon}
            />
          </View>
          <Text style={styles.title}>{postData.title}</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.postImage} />
        {showLikeButton && (
          <View style={styles.likeOverlay}>
            <Text style={styles.likeText}>Liked!</Text>
          </View>
        )}
      </View>

      <View style={styles.statistics}>
        <View style={styles.statGroup}>
          <TouchableOpacity style={styles.statContainer} onPress={handleLike}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../assets/like_icon.png")}
                style={[styles.statIcon, buttonLiked && styles.likedIcon]}
              />
            </View>
            <Text style={styles.statistic}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statContainer}
            onPress={() => {
              setShowCommentInput(!showCommentInput);
              setShowComments(!showComments);
            }}
          >
            <Image
              source={require("../assets/comment_icon.png")}
              style={styles.statIcon}
            />
            <Text style={styles.statistic}>{comments.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statContainer} onPress={handleShare}>
            <Image
              source={require("../assets/share_icon.png")}
              style={styles.statIcon}
            />
            <Text style={styles.statistic}>{shares}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.statContainer} onPress={handleSave}>
          <Image
            source={require("../assets/save.png")}
            style={[styles.statIcon, isSaved && styles.savedIcon]} // Change color based on isSaved
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{postData.content}</Text>

      {showCommentInput && (
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <Button title="Submit" onPress={handleCommentSubmit} />
        </View>
      )}

      {showComments && (
        <View style={styles.commentsContainer}>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Image
                source={comment.profilePicture}
                style={styles.commentProfilePicture}
              />
              <View style={styles.commentTextContainer}>
                <Text style={styles.commentName}>{comment.name}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const App = () => {
  const postsData = [
    {
      name: "Nara Lokesh",
      title: "IT Minister",
      statistic1: 120,
      statistic2: 45,
      statistic3: 10,
      content:
        "This is an example post content from Nara Lokesh. Here, you can write something interesting or insightful to share with others.",
      imageSource: require("../assets/postImage1.png"),
      profilePictureSource: require("../assets/profile1.png"),
    },
    {
      name: "Aadi Reddy Vasu",
      title: "MLA",
      statistic1: 85,
      statistic2: 23,
      statistic3: 5,
      content:
        "This is an example post content from Aadi Reddy Vasu. Here, you can write something interesting or insightful to share with others.",
      imageSource: require("../assets/postImage2.png"),
      profilePictureSource: require("../assets/profile2.png"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {postsData.map((postData, index) => (
        <Post
          key={index}
          imageSource={postData.imageSource}
          profilePictureSource={postData.profilePictureSource}
          postData={postData}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: width * 0.04,
    marginBottom: 15,
    marginHorizontal: width * 0.03,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  officialIcon: {
    width: width * 0.04,
    height: width * 0.04,
    marginLeft: 5,
  },
  title: {
    fontSize: width * 0.035,
    color: "#555",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 15,
    position: "relative",
  },
  postImage: {
    width: "100%",
    height: width * 0.8,
    borderRadius: 8,
  },
  statistics: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  statGroup: {
    flexDirection: "row",
  },
  statContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: width * 0.03,
  },
  iconContainer: {
    padding: 5,
    borderRadius: 20,
  },
  likedIcon: {
    tintColor: "red",
  },
  statIcon: {
    width: width * 0.05,
    height: width * 0.05,
    marginRight: 5,
  },
  statistic: {
    fontSize: width * 0.035,
    color: "#555",
  },
  content: {
    fontSize: width * 0.04,
    marginBottom: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginRight: 5,
  },
  commentsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 10,
    paddingTop: 10,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  commentProfilePicture: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: (width * 0.08) / 2,
    marginRight: 10,
  },
  commentTextContainer: {
    flex: 1,
  },
  commentName: {
    fontWeight: "bold",
  },
  commentText: {
    color: "#555",
  },
  likeOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 5,
    padding: 5,
  },
  likeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  savedIcon: {
    tintColor: "blue",
    backgroundColor: "", // Change color when saved
  },
});

export default App;
