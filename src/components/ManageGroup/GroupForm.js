import { StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

import Input from "./Input";
import { Colors } from "../../constants/styles";
import Button from "../ui/Button";
import TranslatedText from "../../Context/language-context";

function GroupForm({ 
  onCancel, 
  onSubmit, 
  defaultValues, 
  PageTitle, 
  inputName,
  submitButtonLabel, 
  styleForm,
  styleDeleteContainer,
  styleButtons,
  deleteHandler,
  styleContent,
  styleInputsContainer,
  buttonsContent
}) {

  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title.toString() : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const groupData = {
      title: inputs.title.value,
    };

    const titleIsValid = groupData.title.trim().length > 0 && groupData.title.trim().length <= 30;

    if (!titleIsValid) {
      setInputs((currentInputs) => {
        return {
          title: {
            value: currentInputs.title.value,
            isValid: titleIsValid,
          },
        };
      });
      return;
    }

    onSubmit(groupData);
  }

  const formIsInvalid = !inputs.title.isValid;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styleForm}>
        <View style={styles.titleContainer}>
          <View style={styles.titleContent}>
            <Text style={styles.title}>{PageTitle}</Text>
          </View>
        </View>
        <View style={styleContent}>
          <View style={styleInputsContainer}>
            <Input
              label={inputName}
              invalid={!inputs.title.isValid}
              textInputConfig={{
                multiline: false,
                onChangeText: inputChangeHandler.bind(this, "title"),
                value: inputs.title.value,
              }}
            />
            {formIsInvalid && (
              <TranslatedText 
                enText={'Invalid input values - please check your entered data'} 
                ptText={'Valores de entrada inválidos - verifique os dados inseridos'} 
                style={styles.errorText}
              />                
            )}
          </View>
          <View style={styleButtons}>
            <View style={buttonsContent}>
              <Button onPress={submitHandler}>
                {submitButtonLabel}
              </Button>
              <Button mode="flat" onPress={onCancel}>
                <TranslatedText enText={'Cancel'} ptText={'Cancelar'}/>
              </Button>
            </View>
            <View style={styleDeleteContainer}>
            <View style={styles.divider}></View>
              <Pressable style={styles.buttonDelete} onPress={deleteHandler}>
                <Ionicons
                  name="trash"
                  color={'#fff'}
                  size={20}
                />
                <TranslatedText enText={'Delete group'} ptText={'Deletar grupo'} style={styles.textbutton}/>                
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback> 
  );
}

export default GroupForm;

const styles = StyleSheet.create({
  titleContainer: {
    height: '25%',
    width: '100%',
    backgroundColor: Colors.primary100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleContent: {
    backgroundColor: Colors.primary900,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomLeftRadius: 30,
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary100,
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    color: Colors.error500,
    width: '90%',
    height: '25%',
  },
  button : {
    alignItems: "center",
    width: '80%',
    height: '100%',
  },
  divider: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '2%',
    backgroundColor: Colors.primary800,
    marginVertical: 15
  },
  textbutton: {
    color: Colors.primary100,
    fontWeight: "bold",
  },
  buttonDelete: {
    alignItems: "center",
    justifyContent: 'center',
    width: '60%',
    height: '50%',
    flexDirection: "row",
    backgroundColor: Colors.primary900,
    gap: 5,
    borderRadius: 12
  }
  
});
