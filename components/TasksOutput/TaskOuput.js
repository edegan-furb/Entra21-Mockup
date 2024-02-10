import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import TasksList from "./TasksList";
import { useNavigation } from "@react-navigation/native";
import AddButton from '../GroupsOutput/AddButton';
import { useTheme } from "../../store/theme-context";

function TasksOutput({ tasks, firstText, secondText, title, groupId }) {

  const { colors } = useTheme();

  // Create the navigation component
  const navigation = useNavigation();
    
  // Function to open the team creation modal
  function modalPress() {
    navigation.navigate("ManageTasksScreen");
  }

  let content = 
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        {firstText}
      </Text>
      <Text style={styles.text}>
        {secondText}
      </Text>
      <View style={styles.addButtonContainer}>
        <AddButton 
          title={title} 
          onPress={modalPress} 
          button={tasks.length > 0 ? styles.btnNone : styles.button} 
        />
      </View>
    </View> 
  ;

  if (Array.isArray(tasks) && tasks.length > 0) {
    content = <TasksList tasks={tasks} groupId={groupId} />;
  }

  return <View style={[styles.container, {backgroundColor: colors.background50}]}>{content}</View>;
}

export default TasksOutput;

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
