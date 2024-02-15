import { FlatList } from "react-native";
import CurrentTaskItem from "./CurrentTaskItem";

function CurrentTasksList({ tasks}) {
    return (
        <FlatList
            data={tasks}
            renderItem={({ item }) => <CurrentTaskItem {...item} />}
            keyExtractor={(item) => item.id}
        />
    );
}

export default CurrentTasksList;