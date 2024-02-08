import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import { Feather, Ionicons } from "@expo/vector-icons";

function TaskItem({ id, title, designatedUser, groupId }) {
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
        <View style={styles.container}>
          <View style={styles.iconContent}>
            <Ionicons name="paper-plane" color={Colors.primary100} size={40}/>
          </View>
          <View style={styles.titleContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.textInf}>
              <Ionicons name="person" color={Colors.primary100} size={15} numberOfLines={1}/>   {designatedUser}
              </Text>
            <Text style={styles.textInf}>
              <Ionicons name="calendar-outline" color={Colors.primary100} size={15}/>  
            </Text>
            <Text style={styles.textInf}>
              <Feather name="target" color={Colors.primary100} size={15}/>  {}
            </Text>
          </View>
          <View style={styles.iconContent}>
            <Ionicons name="arrow-redo" color={Colors.primary100} size={25}/>
          </View>
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
    height: 110,
    backgroundColor: Colors.primary950,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    marginVertical: 8,
    borderRadius: 5,
    elevation: 4,
    shadowColor: Colors.primary950,
    shadowRadius: 2,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: .3,
  },
  container: {
    width: '95%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  titleContent: {
    width: '65%',
    overflow: "hidden",
  },
  title: {
    fontSize: 16,
    paddingVertical: 5,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.primary50,
  },
  textInf: {
    padding: 4,
    fontWeight: "500",
    paddingLeft: 15,
    color: Colors.neutral200,
  }
});
