import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";
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

  return <View style={styles.container}></View>;
}

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary100,
  },
});
