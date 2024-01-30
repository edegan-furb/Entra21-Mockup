import React, { useLayoutEffect, useContext, useCallback } from "react";
import { View } from "react-native";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";

import IconButton from "../components/ui/IconButton";

function TaskScreen({ route, navigation }) {
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
      </View>
    );
  }, [navigation, taskId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectTask?.title || "Task",
      headerRight: renderHeaderButtons,
    });
  }, [navigation, selectTask, renderHeaderButtons]);

  return <View></View>;
}

export default TaskScreen;
