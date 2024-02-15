import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";
import CurrentTasksList from "./CurrentTasksList";

function CurrentTasksOutput({ tasks, fallbackText, groupId }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (Array.isArray(tasks) && tasks.length > 0) {
    content = <CurrentTasksList tasks={tasks} groupId={groupId} />;
  }

  return <View style={styles.container}>{content}</View>;
}

export default CurrentTasksOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 12,
    backgroundColor: Colors.primary100,
  },
  infoText: {
    color: Colors.primary800,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
