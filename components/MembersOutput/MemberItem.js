import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import IconButton from "../ui/IconButton";
import { auth } from "../../util/auth";
import { GroupsContext } from "../../store/groups-context";
import { useContext } from "react";

function MemberItem({ id, email, username, onRemoveMember, user, admin }) {
  const currentUser = auth.currentUser.uid;
  const groupsCtx = useContext(GroupsContext);
  let foundMember = null;

  groupsCtx.groups.forEach(group => {
    group.members.forEach(member => {
      if (member.user?._key?.path?.segments[user._key.path.segments.length - 1] === currentUser) {
        foundMember = member;
      }
    });
  });
  const userId = user?._key?.path?.segments[user._key.path.segments.length - 1];
  const isCurrentUser = currentUser === userId;

  const removeMemberHandler = () => {
    onRemoveMember(id);
  };

  return (
    <View style={styles.memberItem}>
      <View>
        <Text style={[styles.textBase, styles.title]}>{username}</Text>
        <Text style={[styles.textBase, styles.subtitle]}>{email}</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row', }}>
        {isCurrentUser ? (
          <Text style={styles.currentUserText}>You</Text>
        ) : foundMember.admin === true ? (
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
          />
        ) : <IconButton
          icon={"key-outline"}
          color={"white"}
          size={24}
        />}
      </View>
    </View>
  );
}

export default MemberItem;

const styles = StyleSheet.create({
  memberItem: {
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
    //fontWeight: "bold",
    margin: 6,
    borderRadius: 20,
  },
});