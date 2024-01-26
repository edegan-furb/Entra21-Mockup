import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";
import { auth } from "../util/auth";

import CompletedTasks from '../components/graphComponents/CompletedTasks';
import TotalTasks from "../components/graphComponents/TotalTasks";
import MissedDeadlines from "../components/graphComponents/MissedDeadlines";
import NumberOfGroups from "../components/graphComponents/NumberOfGroups";

function WelcomeScreen() {
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

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
      <TotalTasks total={99}/>
      <View>
        
        <CompletedTasks concludedTasks={70} pendingTasks={30}/>

        <View>
          <MissedDeadlines number={10}/>
          <NumberOfGroups number={5}/>
        </View>
        
      </View>
        
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
