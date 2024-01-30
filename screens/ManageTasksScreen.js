import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";
import TaskForm from "../components/ManageTask/TaskForm";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";
import Error from "../components/ui/Error";
import Loading from "../components/ui/LoadingOverlay";

function ManageTasksScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const editedTaskId = route.params?.editedTaskId;

  const groupId = route.params?.groupId;

  const groupsCtx = useContext(GroupsContext);

  const isEditing = !!editedTaskId;

  // const selectTask = groupsCtx.groups.tasks.find(
  //   (task) => task.id === editedTaskId
  // );

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(taskData) {
    setIsLoading(true);
    try {
      if (isEditing) {
        groupsCtx.updateTask(editedTaskId, taskData);
        await updateTask(editedTaskId, taskData);
      } else {
        const groupId = await createtask(groupData);
        groupsCtx.addTask(groupId, { ...taskData, id: taskId });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
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
        defaultValues={null}
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
