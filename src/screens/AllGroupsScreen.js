import { useContext } from "react";
import { useState, useEffect } from "react";
import GroupsOuput from "../components/GroupsOutput/GroupsOuput";
import { GroupsContext } from "../Context/groups-context";
import { fetchGroups } from "../util/firebase/firestore/groups";
import Error from "../components/ui/Error";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import TranslatedText from "../Context/language-context";

function AllGroups() {
 //  State variables for loading, error, and initial load
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState();
 const [initialLoad, setInitialLoad] = useState(true);

 //  Access the GroupsContext
 const groupsCtx = useContext(GroupsContext);

 //  useEffect to fetch groups data
 useEffect(() => {
   const getGroups = async () => {
     try {
       //  Fetch groups data and get the stopListening function
       const stopListening = await fetchGroups((groups) => {
         groupsCtx.setGroups(groups);
         if (initialLoad) {
           setIsLoading(false);
           setInitialLoad(false);
         } 
       });

       //  Return the cleanup function to stop listening when the component unmounts
       return () => {
         stopListening();
       };
     } catch (error) {
       console.error("Error fetching groups:", error);
       setError("Could not fetch groups. Please try again.");
       setIsLoading(false);
     }
   };

   // Call the function to fetch groups data
   getGroups();
 }, [initialLoad]);

 if (error && !isLoading) {
   return <Error message={error} />;
 }
 if (isLoading) {
   return <LoadingOverlay />;
 }

  return (
    <GroupsOuput 
      groups={groupsCtx.groups} 
      firstText={
        <TranslatedText 
          enText={"Oops! It looks like you don't have any teams registered yet."} 
          ptText={'Ops! Parece que você ainda não tem nenhuma equipe cadastrada.'}
        />
      }
      secondText={
        <TranslatedText 
          enText={"Press the button below to create your first team now!"} 
          ptText={'Pressione o botão abaixo para criar sua primeira equipe agora!'}
        />
      }
      title={<TranslatedText enText={'Add Teams'} ptText={'Add Times'}/>}
    />
  );
}

export default AllGroups;