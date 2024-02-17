import { View, StyleSheet, Alert } from "react-native";
import AddMemberForm from "../components/AddMembers/AddMemberForm";
import { getUserIdByEmail } from "../util/firebase/firestore/user";
import { setAdminStatus, addMember } from "../util/firebase/firestore/members";
import Error from "../components/ui/Error";
import Loading from "../components/ui/LoadingOverlay";
import { useContext, useState } from "react";
import { GroupsContext } from "../Context/groups-context";
import { generateUniqueId } from "../util/generateUniqueId";
import { useTheme } from "../Context/theme-context";
import { Colors } from "../constants/styles";

function AddMembersScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const groupsCtx = useContext(GroupsContext);
  const groupId = route.params?.groupId;
  const selectGroup = groupsCtx.groups.find((group) => group.id === groupId);

  const { colors, language } = useTheme();

  const userNotFoundText = language === 'en' ? 'Not Found' : 'Não encontrado';
  const userNotFoundSubText = language === 'en' ? 'No user found with the specified email.' : 'Nenhum usuário encontrado com o e-mail especificado.';
  const userMemberText = language === 'en' ? 'User Already a Member' : 'O usuário já é membro';
  const userMemberSubText = language === 'en' ? 'This user is already a member of the group.' : 'Este usuário já é membro do grupo.';

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(memberData) {
    setIsLoading(true);
    try {
      const userId = await getUserIdByEmail(memberData.email);
      const isAlreadyMember = selectGroup?.members.some(
        (member) => member.user === userId
      );
      if (!userId) {
        Alert.alert(userNotFoundText, userNotFoundSubText);
      } else if (isAlreadyMember) {
        Alert.alert(
          userMemberText,
          userMemberSubText
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
    <View style={[styles.container, { backgroundColor: colors.background1000 }]}>
      <AddMemberForm onCancel={cancelHandler} onSubmit={confirmHandler} />
    </View>
  );
}

export default AddMembersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
