import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext, useEffect, useState } from "react";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";

function GroupScreen({ route, navigation }) {
  const groupsCtx = useContext(GroupsContext);
  const [selectGroup, setSelectGroup] = useState(null);

  const GroupId = route.params?.groupId;

  useEffect(() => {
    if (!GroupId) {
      // If it doesn't exist, navigate back
      navigation.goBack();
    } else {
      // Find and set the selected group
      const group = groupsCtx.groups.find((group) => group.id === GroupId);
      setSelectGroup(group);
    }
  }, [GroupId, groupsCtx.groups, navigation]);

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
