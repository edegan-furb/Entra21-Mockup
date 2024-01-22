import { FlatList } from "react-native";

import MemberItem from "./MemberItem";

function MembersList({ members, onRemoveMember, isAdmin }) {
  const renderMemberItem = (itemData) => {
    return (
      <MemberItem
        {...itemData.item}
        onRemoveMember={onRemoveMember}
        isAdmin={isAdmin}
      />
    );
  };

  return (
    <FlatList
      data={members}
      renderItem={renderMemberItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default MembersList;
