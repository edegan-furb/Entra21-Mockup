import { useContext, useEffect, useState } from 'react';
import TasksOutput from "../components/TasksOutput/TaskOuput"; // Ensure correct import path
import { GroupsContext } from '../store/groups-context';
import { fetchGroups, fetchUsernameAndEmail } from '../util/firestore';
import { auth } from '../util/firebaseConfig';

function WelcomeScreen() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [username, setUsername] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in
  const groupsCtx = useContext(GroupsContext);

  useEffect(() => {
    // Auth state listener to react to user login/logout
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
        // Optionally, trigger username loading here
        loadUsername();
      } else {
        setIsLoggedIn(false); // User is logged out
        // Reset state as needed
        setUsername(null);
        setUserTasks([]);
      }
    });

    return () => unsubscribe(); // Cleanup auth listener
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('No user logged in');
      return;
    }

    const getGroups = async () => {
      try {
        const stopListening = await fetchGroups((groups) => {
          groupsCtx.setGroups(groups);
          if (initialLoad) {
            setInitialLoad(false);
          }
        });
        return () => stopListening();
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    getGroups();
  }, [initialLoad, isLoggedIn]); // Reacts to isLoggedIn

  useEffect(() => {
    if (username && groupsCtx.groups && groupsCtx.groups.length > 0) {
      const tasks = getTasksForUser(groupsCtx.groups, username);
      setUserTasks(tasks);
    }
  }, [username, groupsCtx.groups]);

  function getTasksForUser(groups, username) {
    const tasksForUser = [];
    groups.forEach(group => {
      const filteredTasks = group.tasks.filter(task => task.designatedUser === username);
      tasksForUser.push(...filteredTasks);
    });
    return tasksForUser;
  }

  // Function to load username
  async function loadUsername() {
    try {
      const userDetails = await fetchUsernameAndEmail();
      setUsername(userDetails.username);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  }

  return <TasksOutput tasks={userTasks} fallbackText={"No Tasks"} />;
}

export default WelcomeScreen;
