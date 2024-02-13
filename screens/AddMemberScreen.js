import { View, StyleSheet, Alert } from "react-native";
import { Colors } from "../constants/styles";
import AddMemberForm from "../components/AddMembers/AddMemberForm";
import { getUserIdByEmail } from "../util/firebase/firestore/user";
import { setAdminStatus, addMember } from "../util/firebase/firestore/members";
import Error from "../components/ui/Error";
import Loading from "../components/ui/LoadingOverlay";
import { useContext, useState } from "react";
import { GroupsContext } from "../store/groups-context";
import { generateUniqueId } from "../util/generateUniqueId";

function AddMembersScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const groupsCtx = useContext(GroupsContext);
  const groupId = route.params?.groupId;
  const selectGroup = groupsCtx.groups.find((group) => group.id === groupId);

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(memberData) {
    setIsLoading(true);
    try {
      const userId = await getUserIdByEmail(memberData.email);
      const isAlreadyMember = selectGroup?.members.some(
        (member) => member.user.id === userId
      );
      if (!userId) {
        Alert.alert("Not Found", "No user found with the specified email.");
      } else if (isAlreadyMember) {
        Alert.alert(
          "User Already a Member",
          "This user is already a member of the group."
        );
      } else {
        const memberId = generateUniqueId();
        console.log(memberId);
        console.log(memberId.id);
        groupsCtx.addMember({
          id: memberId,
          admin: memberData.isAdmin,
          user: userId,
          group: groupId,
        });
        await addMember(groupId, userId);
        await setAdminStatus(groupId, userId, memberData.isAdmin);
        navigation.goBack();
      }
      setIsLoading(false);
    } catch (error) {
      setError("Could not add user - please try again later");
      setIsLoading(false);
    }
  }

  if (error && !isLoading) {
    return <Error message={error} />;
  }
  if (isLoading) {
    return <Loading style={{ backgroundColor: Colors.primary800 }} />;
  }

  return (
    <View style={styles.container}>
      <AddMemberForm onCancel={cancelHandler} onSubmit={confirmHandler} />
    </View>
  );
}

export default AddMembersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary800,
  },
});
