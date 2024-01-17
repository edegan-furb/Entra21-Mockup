import { useLayoutEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { GroupsContext } from "../store/groups-context";
import MembersOuput from "../components/MembersOutput/MembersOutput";

function GroupMembersScreen({ navigation, route }) {
  const GroupId = route.params?.editedGroupId;

  const groupsCtx = useContext(GroupsContext);

  const selectGroup = groupsCtx.groups.find((group) => group.id === GroupId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${selectGroup.title}'s Members`,
    });
  }, [navigation]);

  return <MembersOuput members={null} fallbackText="No members found!" />;
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
    color: "red",
  },
  text: {
    fontSize: 16,
    fontWeight: "semibold",
    marginBottom: 8,
    color: "blue",
  },
});
