import { View, StyleSheet, Alert } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";
import TaskForm from "../components/ManageTask/TaskForm";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";
import Error from "../components/ui/Error";
import Loading from "../components/ui/LoadingOverlay";
import {
  createtask,
  getUserIdByEmail,
  isMember,
  updateTask,
} from "../util/firestore";

function ManageTasksScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const editedTaskId = route.params?.editedTaskId;

  const groupId = route.params?.groupId;

  const groupsCtx = useContext(GroupsContext);

  const isEditing = !!editedTaskId;

  let selectTask = null;

  if (groupsCtx.groups) {
    groupsCtx.groups?.forEach((group) => {
      group.tasks?.forEach((task) => {
        if (task.id === editedTaskId) {
          selectTask = task;
        }
      });
    });
  }

  function cancelHandler() {
    console.log(groupId);
    navigation.goBack();
  }

  async function confirmHandler(taskData) {
    setIsLoading(true);
    try {
      const userId = await getUserIdByEmail(taskData.designatedUser);
      // const isMember = selectGroup?.members.some(
      //   (member) => member.user.id === userId
      // );

      if (!userId) {
        Alert.alert("Not Found", "No user found with the specified email.");
        return;
      }
      const checkMembership = await isMember(groupId, userId);
      if (!checkMembership) {
        Alert.alert(
          "User not a Member",
          "This user is not a member of the group."
        );
        return;
      }

      let updatedTaskData = { ...taskData, designatedUser: userId };
      if (isEditing) {
        console.log(updatedTaskData);
        groupsCtx.updateTask(groupId, editedTaskId, updatedTaskData);
        await updateTask(editedTaskId, updatedTaskData);
      } else {
        updatedTaskData = {
          ...taskData,
          designatedUser: userId,
          completed: false,
        };
        const taskId = await createtask(groupId, updatedTaskData);
        console.log(taskId);
        groupsCtx.addTask({ ...taskData, id: taskId });
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setError("Could not save data - please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editedTaskId ? "Update Task" : "Add Task ",
    });
  }, [isEditing]);

  if (error && !isLoading) {
    return <Error message={error} />;
  }
  if (isLoading) {
    return <Loading style={{ backgroundColor: Colors.primary800 }} />;
  }

  return (
    <View style={styles.container}>
      <TaskForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectTask}
      />
    </View>
  );
}

export default ManageTasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary500,
    alignItems: "center",
  },
});
