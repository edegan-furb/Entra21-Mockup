import { FlatList } from "react-native";
import { StyleSheet, View } from "react-native";
import TaskItem from "./TaskItem";

function renderTaskItem(itemData) {
    return <TaskItem {...itemData.item} />;
}

function TasksList({ tasks }) {
    return (
        <View style={styles.listContainer}>
            <FlatList
                data={tasks}
                renderItem={renderTaskItem}
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