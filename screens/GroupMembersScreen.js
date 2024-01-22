import React, { useLayoutEffect, useContext, useState, useEffect } from "react";
import { GroupsContext } from "../store/groups-context";
import MembersOutput from "../components/MembersOutput/MembersOutput";
import { fetchGroupMembers, removeMember } from "../util/firestore";
import Error from "../components/ui/Error";
import LoadingOverlay from "../components/ui/LoadingOverlay";

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
    });
  }, [navigation, groupId, groupsCtx.groups]);

  if (error && !isLoading) {
    return <Error message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  // Find the selected group to get its members
  const selectedGroup = groupsCtx.groups.find((group) => group.id === groupId);
  const groupMembers = selectedGroup ? selectedGroup.members : [];

  const handleRemoveMember = (memberId) => {
    removeMember(memberId)
      .then(() => {
        const updatedMembers = groupsCtx.groups
          .find((group) => group.id === groupId)
          .members.filter((member) => member.id !== memberId);
        groupsCtx.setMembers(groupId, updatedMembers);
      })
      .catch((error) => {
        console.error("Error removing member:", error);
      });
  };

  return (
    <MembersOutput
      members={groupMembers}
      onRemoveMember={handleRemoveMember}
      fallbackText="No members found!"
      isAdmin={isAdmin}
    />
  );
}

export default GroupMembersScreen;
