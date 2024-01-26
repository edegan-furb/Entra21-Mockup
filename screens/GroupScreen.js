import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useCallback,
} from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";
import { auth } from "../util/auth";
import { isAdmin } from "../util/firestore";
import IconButton from "../components/ui/IconButton";

function GroupScreen({ route, navigation }) {
  const currentUser = auth.currentUser.uid;
  const groupsCtx = useContext(GroupsContext);
  const groupId = route.params?.groupId;
  const selectGroup = groupsCtx.groups.find((group) => group.id === groupId);

  const [isAdminStatus, setIsAdminStatus] = useState(false);

  useEffect(() => {
    if (!selectGroup) {
      navigation.navigate("Groups");
      Alert.alert("Access Update", "You no longer have access to this group");
    }
  }, [navigation, selectGroup]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (groupId && currentUser) {
        const unsubscribe = isAdmin(groupId, currentUser, setIsAdminStatus);
        return () => unsubscribe();
      }
    };
    fetchAdminStatus();
  }, [groupId, currentUser]);

  const renderHeaderButtons = useCallback(() => {
    return (
      <View style={{ flexDirection: "row" }}>
        {isAdminStatus && (
          <IconButton
            icon={"create-outline"}
            color={Colors.primary100}
            size={24}
            onPress={() => {
              navigation.navigate("ManageGroupScreen", {
                editedGroupId: groupId,
              });
            }}
          />
        )}
        <IconButton
          icon={"people-outline"}
          color={Colors.primary100}
          size={24}
          onPress={() => {
            navigation.navigate("GroupMembersScreen", {
              groupId: groupId,
            });
          }}
        />
        <IconButton
          icon={"add-circle-outline"}
          color={Colors.primary100}
          size={24}
          onPress={() => {
            navigation.navigate("ManageTasksScreen", {
              groupId: groupId,
            });
          }}
        />
      </View>
    );
  }, [isAdminStatus, navigation, groupId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectGroup?.title || "Group",
      headerRight: renderHeaderButtons,
    });
  }, [navigation, selectGroup, renderHeaderButtons]);

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
