import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";
import { auth } from "../util/auth";
import { Colors } from "../constants/styles";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMesssage] = useState("");
  const [userProfile, setUserProfile] = useState([]);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const user = auth.currentUser;

  useEffect(() => {
    if (user !== null) {
      const profileDetails = user.providerData.map((profile) => ({
        providerId: profile.providerId,
        uid: profile.uid,
        displayName: profile.displayName,
        email: profile.email,
      }));

      setUserProfile(profileDetails);
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(
        "https://authapp-97508-default-rtdb.firebaseio.com//message.json?auth=" +
          token
      )
      .then((response) => {
        //console.log("protected message = " + response.data);
        setFetchedMesssage(response.data);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
      {userProfile.map((profile, index) => (
        <View key={index}>
          <Text>Username: {profile.displayName}</Text>
          <Text>Email: {profile.email}</Text>
        </View>
      ))}
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
