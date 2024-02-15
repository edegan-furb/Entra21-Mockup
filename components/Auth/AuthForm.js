import { Text, Pressable } from 'react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

import Button from '../ui/Button';
import Input from './Input';
import { useTheme } from '../../store/theme-context';
import TranslatedText from '../../store/language-context';

function AuthForm({ isLogin, onSubmit, credentialsInvalid, onFocus, onBlur }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const { language } = useTheme() || {}; 

  const placeHolderEmail = language === 'en' ? 'Email Adress' : 'Email de Acesso';
  const placeHolderPassword = language === 'en' ? 'Password' : 'Senha';
  const placeHolderConfirmEmail = language === 'en' ? 'Confirm Email Address' : 'Confirme seu Email';
  const placeHolderConfirmPass = language === 'en' ? 'Confirm Password' : 'Confirme sua senha';
  
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
          placeHolder={placeHolderEmail}
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          height={0}
        />
        {!isLogin && (
          <Input
            placeHolder={placeHolderConfirmEmail}
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
            height={0}
          />
        )}
        <Input
          placeHolder={placeHolderPassword}
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            placeHolder={placeHolderConfirmPass}
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttonsContainer}>
          <View style={isLogin ? styles.buttonContentLogin : styles.buttonContentSignup}>
            <Button 
              onPress={submitHandler} 
            >
              {isLogin ? 
                <TranslatedText enText={'LOGIN'} ptText={'ENTRAR'}/>  
                : 
                <TranslatedText enText={'SIGNUP'} ptText={'CADASTRAR-SE'}/>
              }
            </Button>
          </View>
          <View style={styles.signUpButton}>
            <Text style={styles.signText}>
              {isLogin ? 
                <TranslatedText enText={ "Don't have an account?"} ptText={'Ainda não possui uma conta?'}/>  
                : 
                <TranslatedText enText={'Do you have an account?'} ptText={'Já possui uma conta?'}/>
              }
            </Text>
            <Pressable
              style={({ pressed }) => pressed && styles.pressed}
              onPress={() => onPressHandler(isLogin ? "Signup" : 'Login')}
            >
              <Text style={styles.signTextButton}>
                {isLogin ?
                  <TranslatedText enText={'SignUp'} ptText={'Cadastre-se'}/> 
                  : 
                  <TranslatedText enText={'LogIn'} ptText={'Entre'}/>
                }
              </Text>
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.neutral100,
  },
  inputAreaLogin: {
    height: '60%',
    width: '100%',
    gap: 20,
  },
  inputAreaSignup: {
    height: '75%',
    width: '100%',
  },
  buttonsContainer: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: "center",
  },
  buttonContentLogin: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: "center",
  },
  buttonContentSignup: {
    width: '100%',
    height: '50%',
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
