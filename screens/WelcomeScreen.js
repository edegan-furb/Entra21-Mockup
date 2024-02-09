import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { GroupsContext } from "../store/groups-context";
import { Colors } from "../constants/styles";
import { fetchGroups, fetchUsernameAndEmail } from "../util/firestore";
import WelcomeBanner from "../components/homeComponents/WelcomeBanner";
import { useTheme } from "../store/theme-context"; 
import { auth } from "../util/firebaseConfig";
import CurrentTasksOutput from '../components/CurrentTasksOutput/CurrentTaskOuput'

function WelcomeScreen({ navigation, route }) {

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const groupsCtx = useContext(GroupsContext);
  
  const { colors } = useTheme(); 

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

  function goToGroups() {
    navigation.navigate("Groups", {
      editedGroupId: route.params?.groupId,
    });
  }

  const loadUserData = async () => {
    try {
      const userDetails = await fetchUsernameAndEmail();
      setUsername(userDetails.username);
      console.log("Username:", username);
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
    <SafeAreaView style={[styles.rootContainer, {backgroundColor: colors.background50}]}>

      <View style={styles.hiContainer}>
        <Text style={[styles.hi, {color: colors.text900}]}>Hi, {username}</Text>
      </View>

      <View style={styles.container}>

        <View style={styles.welcomeContainer}>
          <WelcomeBanner onPress={goToGroups} />
        </View>

        <View style={styles.ongoingTasksContainer}>
          <Text style={[styles.ongoingTasks, {color: colors.text900}]}>Ongoing task</Text>
        </View>

        <View style={styles.tasksContainer}>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.primary800} />
        ) : (
          <CurrentTasksOutput tasks={[{id: 1, deadline: '2023', taskName: 'oi', groupName: 'FC', taskProgress: 0.8}]} firstText="No tasks found" />
        )}
        {console.log("oi  ", userTasks)}
        {console.log("Username:", username)}
          {/* <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <TaskHome
                deadline={item.deadline}
                taskName={item.taskName}
                groupName={item.groupName}
                taskProgress={item.taskProgress}
              />
            )}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: '2%'
  },

  welcomeContainer: {
    width: '95%',
    height: '20%',
    marginBottom: '5%'
  },
  hiContainer: {
    marginTop: '15%',
    marginBottom: '8%',
    marginLeft: '5%',
  },
  tasksContainer: {
    width: '100%',
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: "wrap",
  },
  hi: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary950
  },
  ongoingTasksContainer: {
    alignSelf: 'flex-start',
    marginTop: '8%',
    marginBottom: '8%',
    marginLeft: '5%',
  },
  ongoingTasks: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary950
  },
});
