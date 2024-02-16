import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import IconButton from "../ui/IconButton";
import { auth } from "../../util/firebase/auth";
import { GroupsContext } from "../../Context/groups-context";
import { useContext, useEffect, useState } from "react";
import { getImageUrlByName, getUserImageName } from "../../util/firebase/storage";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../../Context/theme-context";

function MemberItem({
  id,
  email,
  username,
  onRemoveMember,
  user,
  admin,
  onChangeAdminStatus,
  groupId
}) {
  const [imageSource, setImageSource] = useState(null);
  const { language } = useTheme();
  const currentUser = auth.currentUser.uid;
  const groupsCtx = useContext(GroupsContext);
  const currentGroup = groupsCtx.groups?.find(g => g.id === groupId);
  let foundMember = null;

  const alertAdminDeniedText = language === 'en' ? 'Access Denied' : 'Acesso Negado';
  const alertAdminDeniedSubText = language === 'en' ? 'You are not an administrador' : 'Você não é um administrador.';

  if (currentGroup) {
    currentGroup.members?.forEach((member) => {
      if (member.user === currentUser) {
        foundMember = member;
      }
    });
  }

  const isAdmin = foundMember && foundMember.admin === true;
  const userId = user;
  const isCurrentUser = currentUser === userId;

  const removeMemberHandler = () => {
    onRemoveMember(id);
  };

  const changeAdminStatus = () => {
    if (!isAdmin) {
      Alert.alert(
        alertAdminDeniedText,
        alertAdminDeniedSubText,
        [{ text: "OK" }],
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
          <Ionicons name="person-circle-outline" color="#ffffff" size={50} style={styles.icon} /> //size needs to be 100% of imageContaineir View
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.textBase, styles.title]} numberOfLines={1}>{username}</Text>
        <Text style={[styles.textBase, styles.subtitle]} numberOfLines={1}>{email}</Text>
      </View>
      <View style={styles.btnContainer}>
        {isCurrentUser ? (
          <IconButton
            icon={"exit-outline"}
            color={"white"}
            size={24}
            onPress={removeMemberHandler}
          />
        ) : isAdmin === true ? (
          <IconButton
            icon={"person-remove-outline"}
            color={Colors.primary100}
            size={24}
            onPress={removeMemberHandler}
          />
        ) : null}
        {admin ? (
          <IconButton
            icon={"key"}
            color={Colors.primary100}
            size={24}
            onPress={changeAdminStatus}
          />
        ) : (
          <IconButton
            icon={"key-outline"}
            color={Colors.primary100}
            size={24}
            onPress={changeAdminStatus}
          />
        )}
      </View>
    </View >
  );
}

export default MemberItem;

const styles = StyleSheet.create({
  memberItem: {
    padding: 20,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: Colors.primary950,
    elevation: 4,
    shadowColor: Colors.primary950,
    shadowRadius: 2,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: .3,
  },
  textContainer: {
    width: '50%',
    justifyContent: "center"
  },
  textBase: {
    color: Colors.primary100,
    width: '80%',
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  currentUserText: {
    color: Colors.primary100,
    fontSize: 16,
    fontWeight: "bold",
    margin: 6,
    borderRadius: 20,
  },
  imageContainer: {
    width: '15%',
    maxWidth: 50,
    maxHeight: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: Colors.primary100
  },
});
