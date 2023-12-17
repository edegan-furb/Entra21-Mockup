import { StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, Pressable } from "react-native";
import { useState } from "react";

import Input from "./Input";
import { Colors } from "../../constants/styles";

function GroupForm({ submitButtonLabel, onCancel, onSubmit, defaultValues, PageTitle }) {
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

    const titleIsValid = groupData.title.trim().length > 0;

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
      <View style={styles.form}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{PageTitle}</Text>
        </View>
        <View style={styles.content}>
          <Input
            label={"Enter the group name"}
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
          <View style={styles.buttons}>
            <Pressable style={styles.button} onPress={submitHandler}>
              <Text style={styles.textbutton}>{submitButtonLabel}</Text>
            </Pressable>
            <Pressable style={styles.button} mode="flat" onPress={onCancel}>
              <Text style={styles.textbutton}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default GroupForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    height: '60%',
    width: '100%',
    borderRadius: 5,
    backgroundColor: Colors.primary100,
  },
  titleContainer: {
    height: '15%',
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary900,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
    margin: 8,
  },
  content: {
    height: '60%',
    alignItems: "center",
    justifyContent: "center"
  },
  buttons: {
    width: '100%',
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  button : {
    width: '40%',
    height: '70%',
    borderRadius: 12,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: Colors.primary900,
  },
  textbutton: {
    color: '#fff',
    fontWeight: "bold"
  }
});
