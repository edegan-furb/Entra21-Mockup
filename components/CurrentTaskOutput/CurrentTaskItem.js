import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { Ionicons } from "@expo/vector-icons";

function CurrentTaskItem({ id, title, designatedUser, group, date, completed }) {
  const navigation = useNavigation();

  function taskPressHandler() {
    navigation.navigate("TaskScreen", {
      previous: "Welcome",
      taskId: id,
      groupId: group,
    });
  }

  return (
    <Pressable
      onPress={taskPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.taskItem}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={[styles.textBase, styles.title]}>{title}</Text>
            <Ionicons
              name={completed ? "checkmark-circle-outline" : "ellipse-outline"}
              color={Colors.primary100}
              size={21}
            />
          </View>
          <Text style={[styles.textBase, styles.text]}>Assigned member: {designatedUser}</Text>
          <Text style={[styles.textBase, styles.text]}>{getFormattedDate(date)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default CurrentTaskItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  titleContainer: {
    flexDirection: "row"
  },
  taskItem: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 8,
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
    marginRight: 8,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
});
