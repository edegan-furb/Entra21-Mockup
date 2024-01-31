import React, { useLayoutEffect, useContext, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";
import IconButton from "../components/ui/IconButton";
import { auth } from "../util/auth";
import { getFormattedDate } from "../util/date";

function TaskScreen({ route, navigation }) {
  const currentUser = auth.currentUser.uid;
  const groupsCtx = useContext(GroupsContext);
  const taskId = route.params?.taskId;

  let selectTask = null;

  if (groupsCtx.groups) {
    groupsCtx.groups?.forEach((group) => {
      group.tasks?.forEach((task) => {
        if (task.id === taskId) {
          selectTask = task;
        }
      });
    });
  }

  const renderHeaderButtons = useCallback(() => {
    return (
      <View style={{ flexDirection: "row" }}>
        {selectTask.owner.id === currentUser && (
          <>
            <IconButton
              icon={"create-outline"}
              color={Colors.primary100}
              size={24}
              onPress={() => {
                navigation.navigate("ManageTasksScreen", {
                  editedTaskId: taskId,
                  groupId: selectTask.group,
                });
              }}
            />
            <IconButton
              icon={"checkmark-circle-outline"}
              color={Colors.primary100}
              size={24}
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

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{getFormattedDate(selectTask?.date)}</Text>
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
                icon={"checkmark-circle-outline"}
                color={Colors.primary800}
                size={24}
              />
            ) : (
              <IconButton
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
    backgroundColor: Colors.primary800,
    borderRadius: 20,
    elevation: 10,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  description: {
    fontSize: 16,
    color: Colors.primary100,
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
