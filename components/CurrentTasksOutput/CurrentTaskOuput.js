import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import TasksList from "./TasksList";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../store/theme-context";

function CurrentTaskOuput({ tasks, firstText, title, groupId }) {
  // Use the theme colors
  const { colors } = useTheme()

  let content = 
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        {firstText}
      </Text>
    </View> 
  ;

  if (Array.isArray(tasks) && tasks.length > 0) {
    content = <TasksList tasks={tasks} groupId={groupId}/>;
  }

  return <View style={[styles.container, {backgroundColor: colors.primary100}]}>{content}</View>;
}

export default CurrentTaskOuput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  textContainer: {
    width: '100%',
    height: '70%',
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    width: '80%',
    fontWeight: "500",
    fontSize: 19,
    textAlign: "center",
    color: Colors.primary900,
  },
  addButtonContainer: {
    width: '100%',
    height: '15%',
    alignItems: "center",
    justifyContent: "center",
    marginLeft: '8%'
  },
  button: {
    width: '80%'
  },
});
