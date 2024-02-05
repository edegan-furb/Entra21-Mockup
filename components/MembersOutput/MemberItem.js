import { Alert, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import IconButton from "../ui/IconButton";
import { auth } from "../../util/auth";
import { GroupsContext } from "../../store/groups-context";
import { useContext } from "react";

function MemberItem({
  id,
  email,
  username,
  onRemoveMember,
  user,
  admin,
  onChangeAdminStatus,
}) {
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

  //console.log(isAdmin);

  return (
    <View style={styles.memberItem}>
      <View>
        <Text style={[styles.textBase, styles.title]}>{username}</Text>
        <Text style={[styles.textBase, styles.subtitle]}>{email}</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {isCurrentUser ? (
          <Text style={styles.currentUserText}>You</Text>
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
    </View>
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
    fontWeight: "bold",
    margin: 6,
    borderRadius: 20,
  },
});
