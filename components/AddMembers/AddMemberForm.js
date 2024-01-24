import { StyleSheet, Text, Switch, View } from "react-native";
import Input from "../AddMembers/Input";
import { Colors } from "../../constants/styles";
import Button from "../ui/Button";
import { useState } from "react";

function AddMemberForm({ onCancel, onSubmit }) {
  const [isChecked, setIsChecked] = useState(false);
  const [inputs, setInputs] = useState({
    email: {
      value: "",
      isValid: true,
    },
  });

  const toggleSwitch = () => setIsChecked((previousState) => !previousState);

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const memberData = {
      email: inputs.email.value,
      isAdmin: isChecked,
    };

    const emailIsValid = memberData.email.includes("@");

    if (!emailIsValid) {
      setInputs((currentInputs) => {
        return {
          email: {
            value: currentInputs.email.value,
            isValid: emailIsValid,
          },
        };
      });
      return;
    }
    onSubmit(memberData);
  }

  const formIsInvalid = !inputs.email.isValid;

  return (
    <View style={styles.form}>
      <Input
        label={"User by Email"}
        textInputConfig={{
          multiline: false,
          onChangeText: inputChangeHandler.bind(this, "email"),
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid email - please check your entered data
        </Text>
      )}
      <View style={styles.switch}>
        <Text style={styles.text}>Set as Admin</Text>
        <Switch
          trackColor={{ false: Colors.error400, true: Colors.primary500 }}
          thumbColor={Colors.primary100}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isChecked}
        />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          Add
        </Button>
      </View>
    </View>
  );
}

export default AddMemberForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary100,
    marginVertical: 24,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
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
    marginTop: 10,
    paddingTop: 25,
    borderTopWidth: 2,
    borderTopColor: Colors.primary500,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
