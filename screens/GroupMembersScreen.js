import React, { useLayoutEffect, useContext, useState, useEffect } from "react";
import { GroupsContext } from "../store/groups-context";
import MembersOutput from "../components/MembersOutput/MembersOutput";
import { fetchGroupMembers } from "../util/firestore";
import Error from "../components/ui/Error";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function GroupMembersScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const groupId = route.params?.editedGroupId;
  const groupsCtx = useContext(GroupsContext);

  useEffect(() => {
    let isMounted = true;

    const getGroupMembers = async () => {
      try {
        const stopListening = await fetchGroupMembers(
          groupId,
          (fetchedMembers) => {
            if (isMounted) {
              // Update the context with the fetched members for the specific group
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

  return (
    <MembersOutput members={groupMembers} fallbackText="No members found!" />
  );
}

export default GroupMembersScreen;
