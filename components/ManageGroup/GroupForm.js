import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import Input from "./Input";
import Button from "../ui/Button";
import { Colors } from "../../constants/styles";

function GroupForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
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

    console.log(groupData);
    onSubmit(groupData);
  }

  const formIsInvalid = !inputs.title.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Group</Text>
      <Input
        label={"Title"}
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
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default GroupForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary100,
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: Colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
