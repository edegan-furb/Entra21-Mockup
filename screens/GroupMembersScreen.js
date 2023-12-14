import { useLayoutEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GroupsContext } from "../store/groups-context";

function GroupMembersScreen({ navigation, route }) {
  const GroupId = route.params?.editedGroupId;

  const groupsCtx = useContext(GroupsContext);

  const selectGroup = groupsCtx.groups.find((group) => group.id === GroupId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${selectGroup.title}'s Members`,
    });
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Members Form - By email</Text>
      <Text style={styles.text}>Add User Button</Text>
      <Text style={styles.title}>Members Ouput - Current Users</Text>
      <Text style={styles.text}>OnPress Remove User from Group</Text>
      <Text style={styles.text}>Leave Group Button</Text>
    </View>
  );
}

export default GroupMembersScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "red"
  },
  text: {
    fontSize: 16,
    fontWeight: "semibold",
    marginBottom: 8,
    color: "blue"
  },
});
