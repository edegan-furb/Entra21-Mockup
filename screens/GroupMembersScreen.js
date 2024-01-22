import React, { useLayoutEffect, useContext, useState, useEffect, useCallback } from "react";
import { GroupsContext } from "../store/groups-context";
import MembersOutput from "../components/MembersOutput/MembersOutput";
import { fetchGroupMembers, removeMember } from "../util/firestore";
import Error from "../components/ui/Error";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { Colors } from "../constants/styles";

function GroupMembersScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const isAdmin = route.params?.isAdmin;
  const groupId = route.params?.editedGroupId;
  const groupsCtx = useContext(GroupsContext);



  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const getGroupMembers = async () => {
      try {
        const stopListening = await fetchGroupMembers(
          groupId,
          (fetchedMembers) => {
            if (isMounted) {
              groupsCtx.setMembers(groupId, fetchedMembers);
              setIsLoading(false);
            }
          }
        );

        return () => {
          isMounted = false;
          stopListening();
        };
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching group members:", err);
          setError("Could not fetch group members. Please try again.");
          setIsLoading(false);
        }
      }
    };

    getGroupMembers();

    return () => {
      isMounted = false;
    };
  }, [groupId, groupsCtx]);

  useLayoutEffect(() => {
    const selectGroup = groupsCtx.groups.find((group) => group.id === groupId);
    navigation.setOptions({
      title: `${selectGroup ? selectGroup.title : "Group"}'s Members`,
      headerRight: renderHeaderButtons,
    });
  }, [navigation, groupId, groupsCtx.groups, renderHeaderButtons]);

  const renderHeaderButtons = useCallback(() => {
    return (
      <View style={{ flexDirection: "row" }}>
        {isAdmin ? (
          <IconButton
            icon={"person-add-outline"}
            color={Colors.primary100}
            size={24}
            onPress={() => {
              navigation.navigate("Add Member");
            }}
          />
        ) : null}
      </View>
    );
  }, [isAdmin, navigation]);

  if (error && !isLoading) {
    return <Error message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  // Find the selected group to get its members
  const selectedGroup = groupsCtx.groups.find((group) => group.id === groupId);
  const groupMembers = selectedGroup ? selectedGroup.members : [];


  async function deleteMemberHandler(memberId) {
    setIsLoading(true);
    try {
      await removeMember(memberId);
      groupsCtx.deleteMember(groupId, memberId);
    } catch (error) {
      setError("Could not delete member - please try again later");
      setIsLoading(false);
    }
  }

  // const handleRemoveMember = (memberId) => {
  //   removeMember(memberId)
  //     .then(() => {
  //       const updatedMembers = groupsCtx.groups
  //         .find((group) => group.id === groupId)
  //         .members.filter((member) => member.id !== memberId);

  //     })
  //     .catch((error) => {
  //       console.error("Error removing member:", error);
  //     });
  // };

  return (
    <MembersOutput
      members={groupMembers}
      onRemoveMember={deleteMemberHandler}
      fallbackText="No members found!"
      isAdmin={isAdmin}
    />
  );
}

export default GroupMembersScreen;
