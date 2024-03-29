import React, {
  useLayoutEffect,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../context/groups-context";
import IconButton from "../components/ui/IconButton";
import { auth } from "../util/firebase/auth";
import { getFormattedDate } from "../util/date";
import {
  updateObjectiveStatus,
  updateTaskStatus,
} from "../util/firebase/firestore/tasks";
import {
  getEmailByUsername,
  getUserIdByEmail,
} from "../util/firebase/firestore/user";
import Error from "../components/ui/Error";

function TaskScreen({ route, navigation }) {
  const [error, setError] = useState();
  const currentUser = auth.currentUser.uid;
  const groupsCtx = useContext(GroupsContext);
  const taskId = route.params?.taskId;
  const groupId = route.params?.groupId;
  const currentGroup = groupsCtx.groups?.find(group => group.id === groupId);
  const previous = route.params?.previous;

  let selectTask = null;
  let foundMember = null;

  if (groupsCtx.groups) {
    groupsCtx.groups?.forEach((group) => {
      group.tasks?.forEach((task) => {
        if (task.id === taskId) {
          selectTask = task;
        }
      });
    });
  }

  console.log(groupId)
  if (currentGroup) {
    currentGroup.members?.forEach((member) => { 
      if (member.user === currentUser) {
        console.log(member)
        foundMember = member;
      }
    });
  }

  const isAdmin = foundMember && foundMember.admin === true;

  useEffect(() => {
    if (!selectTask) {
      navigation.navigate(previous, {
        groupId: groupId,
      });
      Alert.alert("Task Deleted", "This task no longer exists");
    }
  }, [navigation, selectTask]);

  const renderHeaderButtons = useCallback(() => {
    return (
      <View style={{ flexDirection: "row" }}>
        {(isAdmin || selectTask.owner.id === currentUser) && (
          <>
            <IconButton
              icon={"create-outline"}
              color={Colors.primary100}
              size={24}
              onPress={() => {
                navigation.navigate("ManageTasksScreen", {
                  previous: previous,
                  editedTaskId: taskId,
                  groupId: groupId || selectTask.group,
                });
              }}
            />
            <IconButton
              icon={"checkmark-circle-outline"}
              color={Colors.primary100}
              size={24}
              onPress={() => onChangeTaskCompletedStatusHandler()}
            />
          </>
        )}
      </View>
    );
  }, [navigation, taskId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        selectTask?.title +
        " - " +
        (selectTask?.completed ? "completed" : "ongoing") || "Task",
      headerRight: renderHeaderButtons,
    });
  }, [navigation, selectTask, renderHeaderButtons]);

  async function onChangeCompletedStatusHandler(objectiveId) {
    try {
      const email = await getEmailByUsername(selectTask.designatedUser);
      const designatedUser = await getUserIdByEmail(email);
      if (designatedUser === currentUser) {
        groupsCtx.updateObjectiveStatus(
          selectTask.group.id,
          taskId,
          objectiveId
        );
        await updateObjectiveStatus(taskId, objectiveId);
      } else {
        Alert.alert(
          "Access Denied",
          "This Task was not assigned to you.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } catch {
      setError("Could not update objective status - please try again later");
    }
  }

  async function onChangeTaskCompletedStatusHandler() {
    try {
      console.log(selectTask.designatedUser)
      groupsCtx.updateTaskStatus(selectTask.group, taskId);
      await updateTaskStatus(taskId);
    } catch {
      setError("Could not update task status - please try again later");
    }
  }

  if (error && !isLoading) {
    return <Error message={error} />;
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {selectTask?.date ? getFormattedDate(selectTask.date) : "No Date"}
          </Text>
        </View>
        <View style={styles.designatedUserContainer}>
          <Text style={styles.designatedUser}>
            {selectTask?.designatedUser}
          </Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{selectTask?.description}</Text>
      </View>
      <View style={styles.objectivesContainer}>
        {selectTask?.objectives.map((objective, index) => (
          <View key={index} style={styles.objectivesInnerContainer}>
            {objective?.completed ? (
              <IconButton
                onPress={() => onChangeCompletedStatusHandler(objective?.id)}
                icon={"checkmark-circle-outline"}
                color={Colors.primary800}
                size={32}
              />
            ) : (
              <IconButton
                onPress={() => onChangeCompletedStatusHandler(objective?.id)}
                icon={"ellipse-outline"}
                color={Colors.primary800}
                size={32}
              />
            )}
            <Text style={styles.objectives}> {objective.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default TaskScreen;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 20,
    backgroundColor: Colors.primary100,
  },
  infoContainer: {
    borderTopColor: Colors.primary800,
    borderTopWidth: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  dateContainer: {
    padding: 6,
    borderBottomColor: Colors.primary800,
    borderBottomWidth: 1.5,
  },
  date: {
    fontSize: 16,
    color: Colors.primary800,
  },
  designatedUserContainer: {
    padding: 6,
    borderBottomColor: Colors.primary800,
    borderBottomWidth: 1.5,
  },
  designatedUser: {
    fontSize: 16,
    color: Colors.primary800,
  },
  descriptionContainer: {
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.primary800,
    borderRadius: 12,
    elevation: 3,
    shadowColor: Colors.primary100,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  description: {
    fontSize: 16,
    color: Colors.primary800,
    justifyContent: "center",
    textAlign: "center",
  },
  objectivesContainer: {
    marginVertical: 8,
  },
  objectivesInnerContainer: {
    marginTop: 12,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.primary800,
    borderRadius: 12,
    elevation: 3,
    shadowColor: Colors.primary100,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    padding: 6,
  },
  objectives: {
    color: Colors.primary800,
    fontSize: 16,
    textAlign: "left",
    flexShrink: 1,
  },
});
