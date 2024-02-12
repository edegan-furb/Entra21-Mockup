import { FlatList, StyleSheet, View } from "react-native";

import GroupItem from "./GroupItem";

function renderGroupItem(itemData) {
  return <GroupItem {...itemData.item} />;
}

function GroupsList({ groups }) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={groups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
}

export default GroupsList;

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 40
  },
  list: {
    width: '80%',
  }
})