import { StyleSheet, Text, View } from "react-native";
import TasksList from "./TasksList";
import { useTheme } from "../../Context/theme-context";

function CurrentTaskOuput({ tasks, firstText }) {
  // Use the theme colors
  const { colors } = useTheme()

  let content = 
    <View style={styles.textContainer}>
      <Text style={[styles.text, { color: colors.text200 }]}>
        {firstText}
      </Text>
    </View> 
  ;

  if (Array.isArray(tasks) && tasks.length > 0) {
    content = <TasksList tasks={tasks}/>;
  }

  return <View style={styles.container}>{content}</View>;
}

export default CurrentTaskOuput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: '50%',
    height: '70%',
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    width: '80%',
    fontWeight: "500",
    fontSize: 19,
    textAlign: "center",
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
