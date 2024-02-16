import { FlatList } from "react-native";
import TaskItem from "./TaskItem";

function TasksList({ tasks, groupId }) {
    return (
        <FlatList
            data={tasks}
            renderItem={({ item }) => <TaskItem {...item} groupId={groupId} />}
            keyExtractor={(item) => item.id}
        />
    );
}

export default TasksList;