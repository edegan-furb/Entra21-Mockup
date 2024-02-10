import { FlatList } from "react-native";
import { StyleSheet, View } from "react-native";
import TaskHome from "./TaskHome";

function TasksList({ tasks, groupId }) {

  function ProgressCalc (numOfObjectives){

  }

  function dateFormating(date) {
    //inicializing variables
    let dateOriginal = date.toString();
    let formatDate = new Date(dateOriginal)

    //Configuring format options
    let options = { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    };

    return formatDate.toLocaleDateString('en-US', options)
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => 
        <TaskHome
          taskName={item.title}
          deadline={dateFormating(item.date)}
          groupId={groupId}
        />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

export default TasksList;

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20
  },
  list: {
    width: '100%',
  }
})
