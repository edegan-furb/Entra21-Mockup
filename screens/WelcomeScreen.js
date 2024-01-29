import axios from "axios";
import { useContext, useEffect, useState } from "react";


import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { AuthContext } from "../store/auth-context";
import { auth } from "../util/auth";

import CompletedTasks from '../components/graphComponents/CompletedTasks';
import TotalTasks from "../components/graphComponents/TotalTasks";
import MissedDeadlines from "../components/graphComponents/MissedDeadlines";
import NumberOfGroups from "../components/graphComponents/NumberOfGroups";
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

  return (
    <SafeAreaView style={styles.rootContainer}>

      <View style={styles.hiContainer}>
        <HiComp name="Ariel"/>
      </View>

      <View style={styles.container}> 
      
      <View style={styles.containerRow1}>
        <WelcomeComp onPress={goToGroups}/>
      </View>
        

        <TotalTasks total={99}/>
        <View style={styles.containerRow2}>
        
          <CompletedTasks concludedTasks={70} pendingTasks={30}/>

          <View>
            <MissedDeadlines number={10}/>
            <NumberOfGroups number={5}/>
          </View>
        
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 32, 
  },
  containerRow2: {
    flexDirection: "row",
  },
  containerRow1:{
    marginBottom: '5%'
  },
  hiContainer: {
    marginTop: '15%',
    marginBottom: '8%',
    marginLeft: '5%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
