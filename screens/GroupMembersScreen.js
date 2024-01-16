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
      <Text style={styles.title}>List of Members</Text>
      <Text style={styles.text}>delete button next to members</Text> 
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
