import { Text, Pressable } from 'react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

import Button from '../ui/Button';
import Input from './Input';
import ButtonGoogleLogin from "../SignUp-Login-components/ButtonGoogleLogin";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const navigation = useNavigation();
  
  function onPressHandler(page) {
    if(page === 'Signup') {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Login");
    }
  }
  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View style={isLogin ? styles.inputAreaLogin : styles.inputAreaSignup}>
        <Input
          placeHolder="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          height={0}
        />
        {!isLogin && (
          <Input
            placeHolder="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
            height={0}
          />
        )}
        <Input
          placeHolder="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            placeHolder="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
      </View>

      <View style={styles.buttons}>
        <Button 
          onPress={submitHandler} 
          styleButton={
            isLogin ? 
              styles.stylesButton 
              :
              [styles.stylesButton, styles.paddingButton]
            }
          >
          {isLogin ? 'LOGIN' : 'SIGNUP'}
        </Button>
        <ButtonGoogleLogin/>
        <View style={styles.signUpButton}>
          <Text style={styles.signText}>{isLogin ? "Don't have an account?" : 'Do you have an account?'}</Text>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => onPressHandler(isLogin ? "Signup" : 'Login')}
          >
            <Text style={styles.signTextButton}>{isLogin ? "SignUp" : 'LogIn'}</Text>
          </Pressable>
        </View>
      </View>
      
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  form: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputAreaLogin: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    gap: 35,
  },
  inputAreaSignup: {
    height: '65%',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 60
  },
  buttons: {
    width: '100%',
    height: '40%',
    justifyContent: 'flex-end',
    marginTop: 30,
    gap: 10,
  },
  stylesButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingButton: {
    paddingHorizontal: '3%'
  },
  signUpButton: {
    height: "18%",
    flexDirection: "row",
    alignItems: 'flex-end',
    justifyContent: "center",
    gap: 5
  },
  signText: {
    fontSize: 15,
    fontFamily: "open-sans",
    color: Colors.primary950,
  },
  signTextButton: {
    fontSize: 15,
    fontFamily: "open-sans-bold",
    color: Colors.primary800,
    textDecorationLine: 'underline'
  },
  pressed: {
    opacity: 0.5
  }
});
