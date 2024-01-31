import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";
import TasksList from "./TasksList";

function TasksOutput({ tasks, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (tasks.length > 0) {
    content = <TasksList tasks={tasks} />;
  }

  return <View style={styles.container}>{content}</View>;
}

export default TasksOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: Colors.primary100,
  },
  infoText: {
    color: Colors.primary800,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
