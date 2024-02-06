import {
  StyleSheet, 
  TouchableWithoutFeedback, 
  View, 
  Keyboard, 
  Platform, 
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthForm from "./AuthForm";

import { Colors } from "../../constants/styles";
import PagesTitle from "../SignUp-Login/PagesTitle";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

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
      <SafeAreaView style={styles.rootContainer}>
        <PagesTitle 
          style={styles.containerPageTitle}
          title={isLogin ? 'Wellcome back!' : 'Hello!'} 
          subTitle={isLogin ? 'Hello there, login to continue' : 'Create a new account to continue'}
        />
        <View style={styles.inputsContainer}>
          <AuthForm
            isLogin={isLogin}
            onSubmit={submitHandler}
            credentialsInvalid={credentialsInvalid}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback> 
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primary800
  },
  containerPageTitle: {
    width: '100%',
    height: '40%',
    alignItems: "flex-start",
    justifyContent: 'flex-start',
    backgroundColor: Colors.neutral100,
  },
  inputsContainer: {
    height: '65%',
  }
});
