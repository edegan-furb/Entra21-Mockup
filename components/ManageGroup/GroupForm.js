import { StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

import Input from "./Input";
import { Colors } from "../../constants/styles";
import Button from "../ui/Button";

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
          <Text style={styles.title}>{PageTitle}</Text>
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
              <Text style={styles.errorText}>
                Invalid input values - please check your entered data
              </Text>
            )}
          </View>
          <View style={styleButtons}>
            <View style={buttonsContent}>
              <Button styleButton={styles.button} onPress={submitHandler}>
                <Text style={styles.textbutton}>{submitButtonLabel}</Text>
              </Button>
              <Button styleButton={styles.button} mode="flat" onPress={onCancel}>
                <Text style={styles.textbutton}>Cancel</Text>
              </Button>
            </View>
            <View style={styleDeleteContainer}>
            <View style={styles.divider}></View>
              <Button styleButton={styles.buttonDelete}  onPress={deleteHandler}>
                <Ionicons
                  name="trash"
                  color={'#fff'}
                  size={20}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.textbutton}>Delete group</Text>                
                </View>
              </Button>
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
    height: '20%',
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary900,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    justifyContent: 'center',
    width: '70%',
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
    fontWeight: "bold"
  },
  buttonDelete: {
    alignItems: "center",
    justifyContent: 'center',
    width: '60%',
    height: '90%',
    flexDirection: "row",
    backgroundColor: Colors.primary900,
    borderRadius: 12
  },
  textContainer: {
    width: '65%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary100
  },
});
