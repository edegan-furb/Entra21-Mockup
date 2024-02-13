import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import IconButton from "../ui/IconButton";
import { auth } from "../../util/firebase/auth";
import { GroupsContext } from "../../store/groups-context";
import { getImageUrlByName, getUserImageName } from "../../util/firebase/storage";
import { Ionicons } from "@expo/vector-icons";

function MemberItem({
  id,
  email,
  username,
  onRemoveMember,
  user,
  admin,
  onChangeAdminStatus,
}) {
  const [imageSource, setImageSource] = useState(null);

  const currentUser = auth.currentUser.uid;
  const groupsCtx = useContext(GroupsContext);
  let foundMember = null;

  if (groupsCtx.groups) {
    groupsCtx.groups?.forEach((group) => {
      group.members?.forEach((member) => {
        if (member.user === currentUser) {
          foundMember = member;
        }
      });
    });
  }

  const isAdmin = foundMember && foundMember.admin === true;
  const userId = user?._key?.path?.segments[user._key.path.segments.length - 1];
  const isCurrentUser = currentUser === userId;

  const removeMemberHandler = () => {
    onRemoveMember(id);
  };

  const changeAdminStatus = () => {
    if (!isAdmin) {
      Alert.alert(
        "Access Denied",
        "You are not an administrator.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      onChangeAdminStatus(id);
    }
  };

  useEffect(() => {
    const fetchUserImage = async () => {
      const imageName = await getUserImageName(user);
      if (imageName) {
        const url = await getImageUrlByName(imageName);
        setImageSource({ uri: url });
      }
    };

    fetchUserImage();
  }, []);

  return (
    <View style={styles.memberItem}>
      <View style={styles.imageContainer}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : (
          <Ionicons
            name="person-circle-outline"
            color="#6366f1"
            size={50}
          />
        )}
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={[styles.textBase, styles.title]}>{username}</Text>
        <Text style={[styles.textBase, styles.subtitle]}>{email}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {isCurrentUser ? (
          <Text style={styles.currentUserText}>You</Text>
        ) : isAdmin === true ? (
          <IconButton
            icon={"person-remove-outline"}
            color={"white"}
            size={24}
            onPress={removeMemberHandler}
          />
        ) : null}
        {admin ? (
          <IconButton
            icon={"key"}
            color={"white"}
            size={24}
            onPress={changeAdminStatus}
          />
        ) : (
          <IconButton
            icon={"key-outline"}
            color={"white"}
            size={24}
            onPress={changeAdminStatus}
          />
        )}
      </View>
    </View>
  );
}

export default MemberItem;

const styles = StyleSheet.create({
  memberItem: {
    height: 80,
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary800,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.primary100,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: Colors.primary100,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
  },
  currentUserText: {
    color: Colors.primary100,
    fontSize: 16,
    margin: 6,
    borderRadius: 20,
  },
  imageContainer: {
    aspectRatio: 1,
    width: "100%",
    maxWidth: 50,
    height: "100%",
    maxHeight: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    resizeMode: "cover",
  },
});
