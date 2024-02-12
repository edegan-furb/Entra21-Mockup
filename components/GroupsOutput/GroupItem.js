import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/styles";
import { useTheme } from "../../store/theme-context";
import { Ionicons } from "@expo/vector-icons";

function GroupItem({ id, title, tasks }) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function groupPressHandler() {
    navigation.navigate("GroupScreen", {
      groupId: id,
    });
  }

  const safeTasks = tasks || [];
  const numberCompletedTasks = safeTasks.filter(
    (task) => task.completed === true
  ).length;
  const numberTasks = safeTasks.length;

  return (
    <Pressable
      onPress={groupPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.groupItem, { backgroundColor: colors.primary800 }]}>
        <View>
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.textBase,
                styles.title,
                { color: colors.primary100 },
              ]}
            >
              {title}
            </Text>
            <Ionicons
              name={
                numberTasks === numberCompletedTasks
                  ? "checkmark-circle-outline"
                  : "ellipse-outline"
              }
              color={Colors.primary100}
              size={21}
            />
          </View>
          <Text
            style={[styles.textBase, styles.text, { color: colors.primary100 }]}
          >
            Tasks: {numberTasks}
          </Text>
          <Text
            style={[styles.textBase, styles.text, { color: colors.primary100 }]}
          >
            Completed Tasks: {numberCompletedTasks}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default GroupItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  titleContainer: {
    flexDirection: "row",
  },
  groupItem: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 8,
    flexDirection: "row",
    //backgroundColor: Colors.primary800,
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.primary100,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    //color: Colors.primary100,
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
