import { useContext } from "react";
import { useState, useEffect } from "react";
import GroupsOuput from "../components/GroupsOutput/GroupsOuput";
import { GroupsContext } from "../store/groups-context";
import { fetchGroups } from "../util/firestore";
import Error from "../components/ui/Error";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function AllExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const groupsCtx = useContext(GroupsContext);

  useEffect(() => {
    async function getGroups() {
      setIsLoading(true);
      try {
        const groups = await fetchGroups();
        groupsCtx.setGroups(groups);
      } catch (error) {
        setError("Could not fetch group!");
      }
      setIsLoading(false);
    }
    getGroups();
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
