import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../ui/Button";
import { Colors } from "../../constants/styles";
import IconButton from "../ui/IconButton";
import { getFormattedDate } from "../../util/date";

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

  function generateUniqueId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
      designatedUser: inputs.designatedUser.value,
      objectives: objectivesData,
    };

    const titleIsValid = taskData.title.trim().length > 0;
    const dateIsValid = taskData.date.toString() !== "Invalid Date";
    const descriptionIsValid = taskData.description.trim().length > 0;
    const designatedUserIsValid = taskData.designatedUser.includes("@");
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
    <View style={inputs.objectives.length > 1 ? styles.container : styles.containerTest}>
      <View style={styles.titleContainer}>
        <View style={styles.titleContent}>
          <Text style={styles.title}>PageTitle</Text>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.contentInput}>
          <Input
            style={styles.rowTitle}
            label={"Title"}
            invalid={!inputs.title.isValid}
            textInputConfig={{
              multiline: false,
              onChangeText: inputChangeHandler.bind(this, "title"),
              value: inputs.title.value
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
            invalid={!inputs.designatedUser.isValid}
            textInputConfig={{
              multiline: false,
              onChangeText: inputChangeHandler.bind(this, "designatedUser"),
              value: inputs.designatedUser.value,
            }}
          />
        </View>  
        <ScrollView contentContainerStyle={styles.scrollView} automaticallyAdjustKeyboardInsets={true}>
          {inputs.objectives.map((objective, index) => (
            <View key={index} style={styles.inputObjectivesRow}>
              <Input
                style={styles.objectivesInput}
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
                    color={Colors.primary900}
                    size={32}
                    onPress={() => removeObjective(index)}
                  />
                </View>
              )}
            </View>
          ))}
          <View style={{flex: 1}}>
            <Button styleButton={styles.buttonAddObjective}  mode="flat" onPress={addObjective}>
              Add Objective
            </Button>
          </View>
        </ScrollView>
        {formIsInvalid && (
          <Text style={styles.errorText}>
            Invalid input values - please check your entered data
          </Text>
        )}    
        <View style={styles.buttonsContainer}>
          <Button 
            styleButton={styles.button} 
            mode="flat" 
            onPress={onCancel}
          >
            Cancel
          </Button>
          <Button 
            styleButton={styles.button} 
            onPress={submitHandler}
          >
            {submitButtonLabel}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default TaskForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '95%',
    backgroundColor: Colors.primary900,
    borderRadius: 20,
    marginTop: 20,
  },
  containerTest: {
    width: '100%',
    height: '85%',
    backgroundColor: Colors.primary900,
    borderRadius: 20,
    marginTop: 20,
  },
  titleContainer: {
    height: '12%',
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
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary100,
    textAlign: "center",
  },  
  form: {
    width: '100%',
    height: '85%',
    paddingHorizontal: 10,
    flex: 1,
    borderTopEndRadius: 30,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: Colors.primary100
  },
  contentInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20
  },
  rowTitle: {
    flex: 2
  },
  rowInput: {
    flex: 1
  },
  scrollView: {
    paddingBottom: 30
  },
  inputObjectivesRow: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end"
  },
  objectivesInput: {
    width: '80%'
  },
  removeButton: {
    height: '65%',
  },
  buttonAddObjective: {
    padding: 10,
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  },
  errorText: {
    textAlign: "center",
    color: Colors.error500,
    margin: 8,
  },
  buttonsContainer: {
    width: '100%',
    height: '20%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    height: '40%',
    alignItems: "center",
    width: '70%'
  }
});