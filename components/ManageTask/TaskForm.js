import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "../ui/Button";
import { Colors } from "../../constants/styles";
import IconButton from "../ui/IconButton";
import { getFormattedDate } from "../../util/date";
import { generateUniqueId } from "../../util/generateUniqueId";
import {
  getEmailByUsername,
  fetchUsernameAndEmail,
} from "../../util/firestore";

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
      value:
        defaultValues && defaultValues.designatedUser ? "Loading email..." : "",
      isValid: true,
    },
    objectives:
      defaultValues && defaultValues.objectives
        ? defaultValues.objectives.map((obj) => ({
            id: obj.id,
            value: obj.value,
            completed: obj.completed,
            isValid: true,
          }))
        : [
            {
              id: generateUniqueId(),
              value: "",
              completed: false,
              isValid: true,
            },
          ],
  });
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    // Assuming fetchUsernameAndEmail is an async function that returns { email: userEmail }
    fetchUsernameAndEmail()
      .then((userDetails) => {
        setCurrentUserEmail(userDetails.email);
        console.log(currentUserEmail);
      })
      .catch((error) => {
        console.error("Error fetching user email:", error);
      });
  }, []);

  useEffect(() => {
    if (defaultValues && defaultValues.designatedUser) {
      getEmailByUsername(defaultValues.designatedUser)
        .then((email) => {
          if (email) {
            setInputs((currentInputs) => ({
              ...currentInputs,
              designatedUser: { value: email, isValid: true },
            }));
          }
        })
        .catch((error) => {
          console.error("Failed to fetch email", error);
          // Handle error, possibly by setting state
        });
    }
  }, [defaultValues, getEmailByUsername]);

  function inputChangeHandler(inputIdentifier, enteredValue, index = null) {
    if (inputIdentifier === "objectives") {
      setInputs((currentInputs) => {
        const updatedObjectives = [...currentInputs.objectives];
        updatedObjectives[index] = {
          ...updatedObjectives[index],
          value: enteredValue,
          completed: false,
          isValid: true,
        };
        return { ...currentInputs, objectives: updatedObjectives };
      });
    } else {
      setInputs((currentInputs) => {
        return {
          ...currentInputs,
          [inputIdentifier]: { value: enteredValue, isValid: true },
        };
      });
    }
  }

  function addObjective() {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        objectives: [
          ...currentInputs.objectives,
          {
            id: generateUniqueId(),
            value: "",
            completed: false,
            isValid: true,
          },
        ],
      };
    });
  }

  function removeObjective(index) {
    setInputs((currentInputs) => {
      const updatedObjectives = currentInputs.objectives.filter(
        (_, i) => i !== index
      );
      return { ...currentInputs, objectives: updatedObjectives };
    });
  }

  function submitHandler() {
    const objectivesData = inputs.objectives.map((objective) => ({
      id: objective.id,
      value: objective.value,
      completed: objective.completed,
    }));
    const taskData = {
      title: inputs.title.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
      designatedUser: inputs.designatedUser.value.toLowerCase(),
      objectives: objectivesData,
    };

    const titleIsValid = taskData.title.trim().length > 0;
    const dateIsValid = taskData.date.toString() !== "Invalid Date";
    const descriptionIsValid = taskData.description.trim().length > 0;
    const designatedUserIsValid =
      taskData.designatedUser.includes("@") &&
      taskData.designatedUser.toLowerCase() !== currentUserEmail;
    const objectivesAreValid = inputs.objectives.every(
      (objective) => objective.value.trim().length > 0
    );

    if (
      !titleIsValid ||
      !dateIsValid ||
      !descriptionIsValid ||
      !designatedUserIsValid ||
      !objectivesAreValid
    ) {
      setInputs((currentInputs) => {
        return {
          title: {
            value: currentInputs.title.value,
            isValid: titleIsValid,
          },
          date: {
            value: currentInputs.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
          designatedUser: {
            value: currentInputs.designatedUser.value,
            isValid: designatedUserIsValid,
          },
          objectives: currentInputs.objectives.map((objective) => ({
            id: objective.id,
            value: objective.value,
            completed: objective.completed,
            isValid: objective.value.trim().length > 0,
          })),
        };
      });
      return;
    }

    //console.log(taskData);
    onSubmit(taskData);
  }

  const formIsInvalid =
    !inputs.title.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid ||
    !inputs.designatedUser.isValid ||
    inputs.objectives.some((objective) => !objective.isValid);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
          <View style={styles.inputRow}>
            <Input
              label={"Description"}
              style={styles.rowInput}
              invalid={!inputs.description.isValid}
              textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, "description"),
                value: inputs.description.value,
              }}
            />
          </View>
          <View style={styles.inputRow}>
            <Input
              label={"Designed User by Email"}
              style={styles.rowInput}
              invalid={!inputs.designatedUser.isValid}
              textInputConfig={{
                multiline: false,
                onChangeText: inputChangeHandler.bind(this, "designatedUser"),
                value: inputs.designatedUser.value,
              }}
            />
          </View>
          {inputs.objectives.map((objective, index) => (
            <View key={index} style={styles.inputObjectivesRow}>
              <Input
                style={styles.rowInput}
                label={`Objective ${index + 1}`}
                invalid={!objective.isValid}
                textInputConfig={{
                  multiline: false,
                  onChangeText: (text) =>
                    inputChangeHandler("objectives", text, index),
                  value: objective.value,
                }}
              />
              {inputs.objectives.length > 0 && (
                <View style={styles.removeButton}>
                  <IconButton
                    icon={"close-circle-outline"}
                    color={Colors.primary100}
                    size={32}
                    onPress={() => removeObjective(index)}
                  />
                </View>
              )}
            </View>
          ))}
          <Button style={styles.button} mode="flat" onPress={addObjective}>
            Add Objective
          </Button>
        </View>
      </ScrollView>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data
        </Text>
      )}
      {!inputs.designatedUser.isValid && (
        <Text style={styles.errorText}>
         You cannot assign a task to yourself.
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
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    //paddingBottom: 60,
    //backgroundColor: "red",
  },
  form: {
    padding: 5,
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
    marginRight: 8,
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
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: Colors.primary500,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    //flex: 1,
    paddingTop: 8,
    minWidth: 120,
    marginHorizontal: 8,
  },
  inputObjectivesRow: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  removeButton: {
    marginTop: "6%",
  },
});
