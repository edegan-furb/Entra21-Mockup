import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/styles";

function TaskItem({ id, title, groupId }) {
  const navigation = useNavigation();

  function taskPressHandler() {
    navigation.navigate("TaskScreen", {
      taskId: id,
      groupId: groupId,
    });
  }

  return (
    <Pressable
      onPress={taskPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.taskItem}>
        <View>
          <Text style={[styles.textBase, styles.title]}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default TaskItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  taskItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary800,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.primary100,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: Colors.primary100,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
});
