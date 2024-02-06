import { Text, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

import Button from '../ui/Button';
import Input from './Input';

function AuthForm({ isLogin, onSubmit, credentialsInvalid, onFocus, onBlur }) {
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
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {!isLogin && (
          <Input
            placeHolder="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
            height={0}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
        <Input
          placeHolder="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
          onFocus={onFocus}
          onBlur={onBlur}
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
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContent}>
            <Button 
              onPress={submitHandler} 
            >
              {isLogin ? 'LOGIN' : 'SIGNUP'}
            </Button>
          </View>
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
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  form: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: Colors.neutral100,
  },
  inputAreaLogin: {
    height: '50%',
    width: '100%',
    gap: 20,
  },
  inputAreaSignup: {
    height: '75%',
    width: '100%',
  },
  buttonsContainer: {
    width: '100%',
    height: '35%',
    alignItems: 'center',
    justifyContent: "center",
  },
  buttonContent: {
    width: '80%',
    height: '45%',
    alignItems: 'center',
    justifyContent: "center",
  },
  signUpButton: {
    height: "30%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    gap: 5,
  },
  signText: {
    fontSize: 13,
    fontFamily: "open-sans",
    color: Colors.primary950,
  },
  signTextButton: {
    fontSize: 13,
    fontFamily: "open-sans-bold",
    color: Colors.primary800,
    textDecorationLine: 'underline'
  },
  pressed: {
    opacity: 0.5
  }
});
