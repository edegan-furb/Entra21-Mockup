import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  TextInput,
} from "react-native";
import IconButton from "../components/ui/IconButton";
import {
  uploadPicture,
  getImageUrlByName,
  getCurrrentUserImageName,
} from "../util/storage";
import { fetchUsernameAndEmail, updateUsername } from "../util/firestore";
import { Ionicons } from "@expo/vector-icons";

function SettingsScreen() {
  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("Loading...");
  const [email, setEmail] = useState("Loading..");
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchUserDetails = async () => {
      const imageName = await getCurrrentUserImageName();
      if (imageName) {
        const url = await getImageUrlByName(imageName);
        setImageSource({ uri: url });
      }

      const userDetails = await fetchUsernameAndEmail();
      if (userDetails) {
        setUsername(userDetails.username);
        setEmail(userDetails.email);
        setEditUsername(userDetails.username);
      }

      setIsLoading(false);
    };

    fetchUserDetails();
  }, []);

  const handleUploadPicture = async () => {
    setIsLoading(true);
    const imageName = await uploadPicture();
    if (imageName) {
      const url = await getImageUrlByName(imageName);
      setImageSource({ uri: url });
    }
    setIsLoading(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      handleSavePress();
    }
  };

  const handleSavePress = async () => {
    await updateUsername(editUsername);
    setUsername(editUsername);
    setIsEditing(false);
  };
  return (
    <View style={styles.rootContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#e0e7ff" />
          ) : imageSource ? (
            <Image source={imageSource} style={styles.image} />
          ) : (
            <Ionicons name="person-circle-outline" color="#6366f1" size={135} />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon={"pencil-outline"}
            size={24}
            color={"#e0e7ff"}
            onPress={handleUploadPicture}
          />
        </View>
      </View>
      <View style={styles.userDetailsContainer}>
        <View style={styles.usernameContainer}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.textInput}
                onChangeText={setEditUsername}
                value={editUsername}
                autoFocus={true}
              />
              <IconButton
                icon={"save-outline"}
                size={20}
                color={"#1e1b4b"}
                onPress={toggleEdit}
              />
            </>
          ) : (
            <>
              <Text style={styles.userInfoText}>{username}</Text>
              <IconButton
                icon={"pencil-outline"}
                size={20}
                color={"#1e1b4b"}
                onPress={toggleEdit}
              />
            </>
          )}
        </View>
        <Text style={styles.userInfoText}>{email}</Text>
      </View>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "#1e1b4b",
    borderWidth: 3,
    borderColor: "#6366f1",
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
    resizeMode: "cover",
  },
  buttonContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#6366f1",
    borderRadius: 100,
    bottom: "20%",
  },
  userDetailsContainer: { flexDirection: "column", alignItems: "flex-start" },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoText: { color: "#1e1b4b" },
  textInput: {
    color: "#1e1b4b",
    borderBottomColor: "#1e1b4b",
    borderBottomWidth: 1,
  },
});
