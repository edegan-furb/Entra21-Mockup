import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import Input from "./Input";
import Button from "../ui/Button";
import { Colors } from "../../constants/styles";

function TaskForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
    designatedUser: {
      value: defaultValues ? defaultValues.designatedUser : "",
      isValid: true,
    }
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
    const taskData = {
      title: inputs.title.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
      designatedUser: inputs.designatedUser.value,
    };

    const titleIsValid = taskData.title.trim().length > 0;
    const dateIsValid = taskData.date.toString() !== "Invalid Date";
    const descriptionIsValid = taskData.description.trim().length > 0;
    const designatedUserIsValid = taskData.designatedUser.includes("@");

    if (!titleIsValid || !dateIsValid || !descriptionIsValid || !designatedUserIsValid) {
      setInputs((currentInputs) => {
        return {
          title: {
            value: currentInputs.title.value,
            isValid: titleIsValid,
          },
          date: {
            value: currentInputs.date.value,
            isValid: dateIsValid
          },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
          designatedUser: {
            value: currentInputs.designatedUser.value,
            isValid: designatedUserIsValid,
          }
        };
      });
      return;
    }

    console.log(taskData);
    onSubmit(taskData);
  }

  const formIsInvalid = !inputs.title.isValid
    || !inputs.date.isValid
    || !inputs.description.isValid
    || !inputs.designatedUser.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Task</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowTitle}
          label={"Title"}
          invalid={!inputs.title.isValid}
          textInputConfig={{
            multiline: false,
            onChangeText: inputChangeHandler.bind(this, "title"),
            value: inputs.title.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label={"Date"}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            placeholderTextStyle: { fontSize: 1 },
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label={"Description"}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      <Input
        label={"Designed User by Email"}
        invalid={!inputs.designatedUser.isValid}
        textInputConfig={{
          multiline: false,
          onChangeText: inputChangeHandler.bind(this, "designatedUser"),
          value: inputs.designatedUser.value,
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

export default TaskForm;

const styles = StyleSheet.create({
  form: {
    //marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary100,
    //marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  rowTitle: {
    flex: 2,
  },
  errorText: {
    textAlign: "center",
    color: Colors.error500,
    margin: 8,
  },
  buttons: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: Colors.primary500,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingTop: 8,
    minWidth: 120,
    marginHorizontal: 8,
  },
});
