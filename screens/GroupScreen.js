import { View, StyleSheet, Text, Alert, Pressable } from "react-native";
import { useLayoutEffect, useContext, useEffect } from "react";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";

function GroupScreen({ route, navigation }) {
  const groupsCtx = useContext(GroupsContext);

  const GroupId = route.params?.groupId;

  const selectGroup = groupsCtx.groups.find((group) => group.id === GroupId);

  useEffect(() => {
    if (!selectGroup) {
      navigation.goBack();
      Alert.alert("Access Update", "You no longer have access to this group");
    }
  }, [selectGroup]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectGroup && selectGroup.title,
    });
  }, [navigation, selectGroup]);

  return (
    <View style={styles.container}></View>
  );
}

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  
});
