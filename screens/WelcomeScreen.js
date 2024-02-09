import { useContext, useEffect, useState } from "react";
import TasksOutput from "../components/TasksOutput/TaskOuput"; // Ensure correct import path
import { GroupsContext } from "../store/groups-context";
import { fetchGroups, fetchUsernameAndEmail } from "../util/firestore";
import { auth } from "../util/firebaseConfig";
import { View, ActivityIndicator, Text } from "react-native";
import { Colors } from "../constants/styles";

function WelcomeScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const groupsCtx = useContext(GroupsContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
       
        await loadUserData();
      } else {
    
        setLoading(false);
      }
    });

 
    return () => unsubscribe();
  }, []);

  const loadUserData = async () => {
    try {
      const userDetails = await fetchUsernameAndEmail();
      setUsername(userDetails.username);
      await loadGroups();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const loadGroups = async () => {
    try {
      const stopListening = await fetchGroups(async (groups) => {
        groupsCtx.setGroups(groups);
        if (username) {
          const tasks = getTasksForUser(groups, username);
          setUserTasks(tasks);
        }
        
        setLoading(false);
      });
      return () => stopListening();
    } catch (error) {
      console.error("Error fetching groups:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username && groupsCtx.groups.length > 0) {
      const tasks = getTasksForUser(groupsCtx.groups, username);
      setUserTasks(tasks);
    }
  }, [username, groupsCtx.groups]);

  function getTasksForUser(groups, username) {
    return groups.reduce((tasksForUser, group) => {
      const filteredTasks = group.tasks.filter(
        (task) => task.designatedUser === username
      );
      return tasksForUser.concat(filteredTasks);
    }, []);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}></View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            textAlign: "left",
            marginHorizontal: 25,
            marginTop: 20,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Your Current Tasks :
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary800} />
        ) : (
          <TasksOutput tasks={userTasks} fallbackText="No Tasks" />
        )}
      </View>
    </View>
  );
}

export default WelcomeScreen;
