import { View, StyleSheet, Text } from "react-native";
import { useLayoutEffect, useContext } from "react";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";

function GroupScreen({ route, navigation }) {
  const groupsCtx = useContext(GroupsContext);

  const GroupId = route.params?.groupId;

  const selectGroup = groupsCtx.groups.find((group) => group.id === GroupId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectGroup && selectGroup.title,
    });
  }, [navigation, selectGroup]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks Ouput</Text>
    </View>
  );
}

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary100,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
