import { useContext } from "react";
import { useState, useEffect } from "react";
import GroupsOuput from "../components/GroupsOutput/GroupsOuput";
import { GroupsContext } from "../store/groups-context";
import { fetchGroups } from "../util/firestore";
import Error from "../components/ui/Error";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function AllExpenses() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const groupsCtx = useContext(GroupsContext);

  useEffect(() => {
    const unsubscribe = fetchGroups((groups) => {
      groupsCtx.setGroups(groups);
    });
  
    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);

  if (error && !isLoading) {
    return <Error message={error} />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <GroupsOuput groups={groupsCtx.groups} fallbackText="No groups found!" />
  );
}

export default AllExpenses;
