import { FlatList } from "react-native";

import MemberItem from "./MemberItem";

function MembersList({ members, onRemoveMember, onChangeAdminStatus, groupId }) {
  const renderMemberItem = (itemData) => {
    return (
      <MemberItem
        {...itemData.item}
        onRemoveMember={onRemoveMember}
        onChangeAdminStatus={onChangeAdminStatus}
        groupId={groupId}
      />
    );
  };

  return (
    <FlatList
      data={members}
      renderItem={renderMemberItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default MembersList;
