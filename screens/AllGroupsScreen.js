import { useContext } from "react";
import { useState, useEffect } from "react";
import GroupsOuput from "../components/GroupsOutput/GroupsOuput";
import { GroupsContext } from "../store/groups-context";
import { fetchGroups } from "../util/firestore";
import Error from "../components/ui/Error";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function AllExpenses() {
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const [error, setError] = useState();
  const [initialLoad, setInitialLoad] = useState(true);

  const groupsCtx = useContext(GroupsContext);

  useEffect(() => {
    async function getGroups() {
      try {
        const unsubscribe = await fetchGroups((groups) => {
          groupsCtx.setGroups(groups);
          // After the initial load, set isLoading to false
          if (initialLoad) {
            setIsLoading(false);
            setInitialLoad(false);
          }
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        setError("Could not fetch group!");
        setIsLoading(false);
      }
    }
    getGroups();
  }, [initialLoad]); // Run the effect when initialLoad changes

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