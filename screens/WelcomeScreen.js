import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { GroupsContext } from "../store/groups-context";
import { Colors } from "../constants/styles";
import { fetchGroups } from "../util/firebase/firestore/groups";
import { fetchUsernameAndEmail } from "../util/firebase/firestore/user";
import { useTheme } from "../store/theme-context"; 
import { auth } from "../util/firebase/firebaseConfig";
import CurrentTasksOutput from '../components/CurrentTasksOutput/CurrentTaskOuput'
import { useNavigation } from "@react-navigation/core";
import WelcomeComp from "../components/Home/WelcomeBanner";
import TranslatedText from "../store/language-context";

function WelcomeScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const groupsCtx = useContext(GroupsContext);
  const navigation = useNavigation();

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
      // Verifica se group e group.tasks estão definidos antes de acessá-los
      if (group && group.tasks) {
        // Filtra as tarefas do grupo para o usuário designado
        const filteredTasks = group.tasks.filter(
          (task) => task.designatedUser === username
        );
        // Concatena as tarefas filtradas ao array de tarefas para o usuário
        return tasksForUser.concat(filteredTasks);
      } else {
        // Se group ou group.tasks não estiverem definidos, retorna o array de tarefas sem modificações
        return tasksForUser;
      }
    }, []);
  }

  function goToGroups() {
    navigation.navigate("Groups");
  }

  return (
    <SafeAreaView style={[styles.rootContainer, {backgroundColor: colors.background50}]}>
      <View style={styles.hiContainer}>
        <TranslatedText
          enText={username ? ("Hi, " + username) : ("Welcome back!")}
          ptText={username ? ("Olá, " + username) : ("Bem vindo de volta!")}
          style={[styles.hi, {color: colors.text900}]}
          numberOfLines={1}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <WelcomeComp  onPress={goToGroups}/>
        </View>
        <View style={styles.ongoingTasksContainer}>
          <TranslatedText
            enText={'Ongoing tasks'}
            ptText={'Tarefas em andamento'}
            style={[styles.ongoingTasks, {color: colors.text900}]}
          />
        </View>
        <View style={styles.tasksContainer}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.primary800} />
          ) : (
            <CurrentTasksOutput 
                tasks={userTasks} 
                firstText={
                <TranslatedText
                  enText={"You don't have tasks yet"}
                  ptText={'Você ainda não possui tarefas'}
                />
              } 
            />
          )}
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
  },
  hi: {
    fontSize: 28,
    fontWeight: "bold",
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
  },
});