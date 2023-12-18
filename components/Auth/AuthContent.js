import {
  StyleSheet, 
  TouchableWithoutFeedback, 
  View, 
  Keyboard, 
  Platform, 
  StatusBar,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from '../SignUp-Login-components/BackButton';

import AuthForm from "./AuthForm";

import { Colors } from "../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import PagesTitle from "../SignUp-Login-components/PagesTitle";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={[
          Colors.primary950,
          Colors.primary900,
          Colors.primary600,
          Colors.primary300,
          Colors.neutral300,
          Colors.neutral300,
        ]}
        locations={[0.01, 0.05, 0.15, 0.3, 0.4, 0.5]}
        style={styles.linearContainer}
      >
        <SafeAreaView style={styles.rootContainer}>
          <BackButton/>
          <PagesTitle title={'Hello !'} subTitle={isLogin ? 'Sign in to continue' : 'Create a new account'}/>
          <View style={styles.inputsContainer}>
            <AuthForm
              isLogin={isLogin}
              onSubmit={submitHandler}
              credentialsInvalid={credentialsInvalid}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  linearContainer: {
    width: wp("100%"),
    height: hp("100%"),
    flexGrow: 1
  },
  rootContainer: {
    width: '100%',
    height: '100%',
  },
  buttons: {
    height: '20%',
  },
});
