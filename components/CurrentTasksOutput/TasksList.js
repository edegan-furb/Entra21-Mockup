import { FlatList } from "react-native";
import { StyleSheet, View } from "react-native";
import TaskHome from "./TaskHome";

function TasksList({ tasks, groupId }) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => 
        <TaskHome
          {...item}
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
    width: '80%',
  }
})
