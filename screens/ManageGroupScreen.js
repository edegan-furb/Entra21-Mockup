import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";
import GroupForm from "../components/ManageGroup/GroupForm";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";
import IconButton from "../components/ui/IconButton";
import { deleteGroup, createGroup, updateGroup } from "../util/firebase/firestore/groups";
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
    return <Loading style={{ backgroundColor: Colors.primary800 }} />;
  }

  return (
    <View style={styles.container}>
      <GroupForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectGroup}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={Colors.error500}
            size={36}
            onPress={deleteGroupHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary500,
    alignItems: "center",
  },
});
