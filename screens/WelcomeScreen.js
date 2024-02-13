import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import TasksOutput from "../components/TasksOutput/TaskOuput";
import { GroupsContext } from "../store/groups-context";
import { fetchGroups } from "../util/firebase/firestore/groups";
import { fetchUsernameAndEmail } from "../util/firebase/firestore/user";
import { auth } from "../util/firebase/firebaseConfig";
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

  useFocusEffect(
    useCallback(() => {
      const fetchIfUserExists = async () => {
        const user = auth.currentUser;
        if (user) {
          await loadUserData();
        } else {
          setLoading(false);
        }
      };

      fetchIfUserExists();
    }, [])
  );

  const loadUserData = async () => {
    setLoading(true);
    try {
      const userDetails = await fetchUsernameAndEmail();
      setUsername(userDetails.username);
      await loadGroups();
    } catch (error) {
      setLoading(false);
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
      const filteredTasks =
        group.tasks && Array.isArray(group.tasks)
          ? group.tasks.filter((task) => task.designatedUser === username)
          : [];
      return tasksForUser.concat(filteredTasks);
    }, []);
  }

  return (
    <View style={styles.container}>
      <View style={styles.usernameContainer}>
        <Text style={styles.text}>
          {username ? "Hi, " + username : "Welcome back!"}
        </Text>
      </View>
      <View style={styles.ongoingTasks}>
        <Text style={styles.text}>Ongoing Tasks</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  usernameContainer: {
    flex: 0.2,
  },
  text: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  ongoingTasks: {
    flex: 1,
  },
});
