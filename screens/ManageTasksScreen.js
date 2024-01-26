import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";
import TaskForm from "../components/ManageTask/TaskForm";
import { Colors } from "../constants/styles";
//import { GroupsContext } from "../store/groups-context";
import IconButton from "../components/ui/IconButton";
//import { deleteTask, createTask, updateTask } from "../util/firestore";
import Error from "../components/ui/Error";
import Loading from "../components/ui/LoadingOverlay";

function ManageTasksScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const editedTaskId = route.params?.editedTaskId;

  //const groupsCtx = useContext(GroupsContext);

  const isEditing = !!editedTaskId;

  function cancelHandler() {
    navigation.goBack();
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
        // onSubmit={confirmHandler}
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
