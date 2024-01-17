import { FlatList } from "react-native";

import MemberItem from "./MemberItem";

function renderMemberItem(itemData) {
  return <MemberItem {...itemData.item} />;
}

function MembersList({ members }) {
  return (
    <FlatList
      data={members}
      renderItem={renderMemberItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default MembersList;
