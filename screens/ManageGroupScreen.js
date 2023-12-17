import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable, Text } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";
import GroupForm from "../components/ManageGroup/GroupForm";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";
import { Ionicons } from '@expo/vector-icons';
import { deleteGroup, createGroup, updateGroup } from "../util/firestore";
import Error from "../components/ui/Error";
import Loading from "../components/ui/LoadingOverlay";

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
    return <Loading />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <GroupForm
          onCancel={cancelHandler}
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onSubmit={confirmHandler}
          defaultValues={selectGroup}
          PageTitle={isEditing ? 'Edit your team' : 'Create a new team'}
        />
        {isEditing && (
          <View style={styles.deleteContainer}>
            <Pressable style={styles.buttonDelete} onPress={deleteGroupHandler}>
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>Delete group</Text>                
              </View>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="trash"
                  color={Colors.error500}
                  size={25}
                />
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ManageGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary800
  },
  deleteContainer: {
    marginTop: -120,
    marginLeft: '5%',
    borderTopWidth: 2,
    borderTopColor: Colors.primary800,
    alignItems: "center",
    justifyContent: "flex-end",
    width: '90%',
    height: '10%',
  },
  buttonDelete: {
    width: '70%',
    height: '80%',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Colors.primary900,
    borderRadius: 12
  },
  textContainer: {
    width: '70%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: "bold"
  },
  iconContainer: {
    backgroundColor: '#fff',
    height: '80%',
    width: '25%',
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  }
});
