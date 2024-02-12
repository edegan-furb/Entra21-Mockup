import { FlatList } from "react-native";
import { StyleSheet, View } from "react-native";
import TaskHome from "./TaskHome";

function TasksList({ tasks, groupId }) {

  function progressCalc (status, numOfObjectives, completedObjectives){
    if (status == true){//if the task has been completed the progress bar going to be 100%
      return 1;
    }
    if (typeof(numOfObjectives) != "number" || typeof(numOfObjectives) != "number"){
      return 0;
    }
    const progress = (completedObjectives / numOfObjectives);
    return progress.toFixed(2);
  }
  //  Getting the numebr of completed objectives 
  const numberCompletedObjectives = objectives => objectives.filter(objective => (objective.completed === true)).length;


  //Formaiting date 
  function dateFormating(date) {
    //inicializing variables
    let dateOriginal = date.toString();
    let formatDate = new Date(dateOriginal)

    //Configuring format options
    let options = { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit',
      timeZone: 'UTC'
    };

    return formatDate.toLocaleDateString('en-US', options)
  }

  // Organizing list by date
  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));


  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => 
        <TaskHome
          objectives={item.objectives}
          taskName={item.title}
          deadline={dateFormating(item.date)}
          taskProgress={progressCalc(item.completed, item.objectivesLength, numberCompletedObjectives(item.objectives))}
          groupId={groupId}
          id={item.id}
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
    paddingTop: 20,
  },
  list: {
    width: '100%',
  }
})
