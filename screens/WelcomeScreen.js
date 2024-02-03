import axios from "axios";
import { useContext, useEffect, useState } from "react";


import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { AuthContext } from "../store/auth-context";
import { auth } from "../util/auth";

import CompletedTasks from '../components/homeComponents/graphComponents/CompletedTasks';
import TotalTasks from "../components/homeComponents/graphComponents/TotalTasks";
import MissedDeadlines from "../components/homeComponents/graphComponents/MissedDeadlines";
import NumberOfGroups from "../components/homeComponents/graphComponents/NumberOfGroups";
import TaskHome from "../components/homeComponents/TaskHome";

import HiComp from "../components/homeComponents/HiComp";
import WelcomeComp from "../components/homeComponents/WelcomeComp";


function WelcomeScreen({ navigation, route }) {


  const [fetchedMessage, setFetchedMesssage] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const user = auth.currentUser;

  useEffect(() => {
    axios
      .get(
        "https://authapp-97508-default-rtdb.firebaseio.com//message.json?auth=" +
        token
      )
      .then((response) => {
        setFetchedMesssage(response.data);
      });
  }, [token]);


  function goToGroups() {
    navigation.navigate("Groups", {
      editedGroupId: route.params?.groupId,
    });
  }

  //USO PROVISÓRIO
  let DATA = [
    {
      id: 1,
      deadline: 'Jan, 31 2024',
      taskName: "Dar Água pro cachorro pincher",
      groupName: "Clube da Luta",
      taskProgress: 0.8
    },
    {
      id: 2,
      deadline: 'Jan, 31 2024',
      taskName: "Dar Água pro cachorro Bulldog",
      groupName: "Clube da Luta",
      taskProgress: 0.5
    },
    {
      id: 3,
      deadline: 'Jan, 31 2024',
      taskName: "Dar Água pro cachorro pincher",
      groupName: "Clube da Luta",
      taskProgress: 0.8
    },
    {
      id: 4,
      deadline: 'Jan, 31 2024',
      taskName: "Dar Água pro cachorro Bulldog",
      groupName: "Clube da Luta",
      taskProgress: 0.5
    },
    {
      id: 5,
      deadline: 'Jan, 31 2024',
      taskName: "Dar Água pro cachorro pincher",
      groupName: "Clube da Luta",
      taskProgress: 0.8
    },
    {
      id: 6,
      deadline: 'Jan, 31 2024',
      taskName: "Dar Água pro cachorro Bulldog",
      groupName: "Clube da Luta",
      taskProgress: 0.5
    },
  ]


  return (
    <SafeAreaView style={styles.rootContainer}>

      <View style={styles.hiContainer}>
        <HiComp name="Ariel" />
      </View>

      <View style={styles.container}>

        <View style={styles.containerRow1}>
          <WelcomeComp onPress={goToGroups} />
        </View>

        <View style={styles.tasksContainer}>
          <FlatList
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
            showsVerticalScrollIndicator={!true}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
    padding: '3%',
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  containerRow2: {
    flexDirection: "row",
  },
  containerRow1: {
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  }
});
