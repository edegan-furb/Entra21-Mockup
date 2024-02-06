import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/styles";

function TaskItem({ id, title }) {
  const navigation = useNavigation();

  function taskPressHandler() {
    navigation.navigate("TaskScreen", {
      taskId: id,
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
    width: '100%',
    height: 105,
    backgroundColor: Colors.primary950,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: 'row',
    marginVertical: 8,
    borderRadius: 5,
    elevation: 4,
    shadowColor: Colors.primary950,
    shadowRadius: 2,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: .3,
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
