import { FlatList } from "react-native";

import MemberItem from "./MemberItem";

function MembersList({ members, onRemoveMember, onChangeAdminStatus }) {
  const renderMemberItem = (itemData) => {
    return (
      <MemberItem
        {...itemData.item}
        onRemoveMember={onRemoveMember}
        onChangeAdminStatus={onChangeAdminStatus}
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
