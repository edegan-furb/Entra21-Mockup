import { FlatList } from "react-native";
import CurrentTaskItem from "./CurrentTaskItem";

function CurrentTasksList({ tasks, groupId }) {
    return (
        <FlatList
            data={tasks}
            renderItem={({ item }) => <CurrentTaskItem {...item} groupId={groupId} />}
            keyExtractor={(item) => item.id}
        />
    );
}

export default CurrentTasksList;