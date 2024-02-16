import { FlatList } from "react-native";

import GroupItem from "./GroupItem";

function renderGroupItem(itemData) {
  return <GroupItem {...itemData.item} />;
}

function GroupsList({ groups }) {
  return (
    <FlatList
      data={groups}
      renderItem={renderGroupItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default GroupsList;
