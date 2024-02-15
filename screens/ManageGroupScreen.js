import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";
import GroupForm from "../components/ManageGroup/GroupForm";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";
import { deleteGroup, createGroup, updateGroup } from "../util/firebase/firestore/groups";
import Error from "../components/ui/Error";
import Loading from "../components/ui/LoadingOverlay";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TranslatedText from "../store/language-context";

function ManageGroupScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const editedGroupId = route.params?.editedGroupId;

  const groupsCtx = useContext(GroupsContext);

  const isEditing = !!editedGroupId;

  function cancelHandler() {
    navigation.goBack();
  }

  async function deleteGroupHandler() {
    setIsLoading(true);
    try {
      await deleteGroup(editedGroupId);
      groupsCtx.deleteGroup(editedGroupId);
      navigation.navigate("Groups");
    } catch (error) {
      setError("Could not delete group - please try again later");
      setIsLoading(false);
    }
  }

  async function confirmHandler(groupData) {
    setIsLoading(true);
    try {
      if (isEditing) {
        groupsCtx.updateGroup(editedGroupId, groupData);
        await updateGroup(editedGroupId, groupData.title);
      } else {
        const groupId = await createGroup(groupData.title);
        groupsCtx.addGroup({ ...groupData, id: groupId });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save date - please try again later");
      setIsLoading(false);
    }
  }

  const selectGroup = groupsCtx.groups.find(
    (group) => group.id === editedGroupId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editedGroupId ? "Update Group" : "Add Group",
    });
  }, [isEditing]);

  if (error && !isLoading) {
    return <Error message={error} />;
  }
  if (isLoading) {
    return <Loading style={{ backgroundColor: Colors.primary800 }} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <GroupForm
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
          defaultValues={selectGroup}
          submitButtonLabel={isEditing ? <TranslatedText enText={'Update'} ptText={'Atualizar'}/> : <TranslatedText enText={'Create'} ptText={'Criar'}/>}
          PageTitle={isEditing ? <TranslatedText enText={'Edit your team'} ptText={'Edite sua equipe'}/> : <TranslatedText enText={'Create a new team'} ptText={'Crie uma nova equipe'}/>}
          styleForm={isEditing ? styles.formEditing : styles.formCreate}
          styleContent={isEditing ? styles.contentEdit : styles.contentCreate}
          inputName={isEditing ? <TranslatedText enText={'Edit group name'} ptText={'Editar nome do grupo'}/> : <TranslatedText enText={'Enter the group name'} ptText={'Digite o nome do grupo'}/>}
          styleInputsContainer={isEditing ? styles.inputEdit : styles.inputCreate}
          styleDeleteContainer={isEditing ? styles.deleteContainer : {display: 'none'}}
          styleButtons={isEditing ? styles.styleButtonsEdit : styles.styleButtonsCreate}
          buttonsContent={isEditing ? styles.buttonEdit : styles.buttonCreate}
          deleteHandler={deleteGroupHandler}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ManageGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary1000,
    alignItems: "center",
  },
  formCreate: {
    marginTop: '30%',
    height: hp('40%'),
    width: wp('90%'),
    borderRadius: 20,
    backgroundColor: Colors.primary900,
  },
  contentCreate: {
    alignItems: 'center',
    justifyContent: "center",
    width: '100%',
    height: '75%',
    borderTopEndRadius: 30,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: Colors.primary100,
  },
  inputCreate: {
    width: '100%',
    height: '60%',
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  styleButtonsCreate: {
    width: '100%',
    height: '30%',
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonCreate: {
    width: '80%',
    height: '60%',
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  formEditing: {
    marginTop: '25%',
    height: hp('35%'),
    width: wp('90%'),
    borderRadius: 20,
    backgroundColor: Colors.primary900,
  },
  contentEdit: {
    alignItems: 'center',
    justifyContent: "center",
    width: '100%',
    height: '100%',
    borderTopEndRadius: 30,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: Colors.primary100,
  },
  inputEdit: {
    width: '100%',
    height: '45%',
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  styleButtonsEdit: {
    width: '100%',
    height: '55%',
    alignItems: "center",
  },
  buttonEdit: {
    width: '80%',
    height: '25%',
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  deleteContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: '90%',
    height: '55%',
  },
});
