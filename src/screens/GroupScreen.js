import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useCallback,
} from "react";
import { View, Alert } from "react-native";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../context/groups-context";
import { auth } from "../util/firebase/auth";
import { isAdmin } from "../util/firebase/firestore/groups";
import { fetchGroupTasks } from "../util/firebase/firestore/tasks";
import IconButton from "../components/ui/IconButton";
import TasksOutput from "../components/TasksOutput/TaskOuput";
import Error from "../components/ui/Error";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function GroupScreen({ route, navigation }) {
  const currentUser = auth.currentUser.uid;
  const groupsCtx = useContext(GroupsContext);
  const groupId = route.params?.groupId;
  const selectGroup = groupsCtx.groups.find((group) => group.id === groupId);
  const selectedGroup = groupsCtx.groups.find((group) => group.id === groupId);
  const groupTasks = selectedGroup ? selectedGroup.tasks : [];

  const [isAdminStatus, setIsAdminStatus] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const stopListening = await fetchGroupTasks(groupId, (fetchedTasks) => {
          groupsCtx.setTasks(groupId, fetchedTasks);
          //console.log(JSON.stringify(fetchedTasks));
          if (initialLoad) {
            setIsLoading(false);
            setInitialLoad(false);
          }
        });
        return () => {
          stopListening();
        };
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Could not fetch tasks. Please try again.");
        setIsLoading(false);
      }
    };

    getTasks();
  }, []);

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
      title: `${selectGroup?.title || "Group"}'s Tasks`,
      headerRight: renderHeaderButtons,
    });
  }, [navigation, selectGroup, renderHeaderButtons]);

  if (error && !isLoading) {
    return <Error message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <TasksOutput
      tasks={groupTasks}
      fallbackText={"No Tasks"}
      groupId={groupId}
    />
  );
}

export default GroupScreen;
