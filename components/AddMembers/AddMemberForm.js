import { StyleSheet, Text, Switch, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import Input from "../AddMembers/Input";
import { Colors } from "../../constants/styles";
import Button from "../ui/Button";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.form}>
        <View style={styles.titleContainer}>
          <View style={styles.titleContent}> 
            <Text style={styles.title}>Add Members</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
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
        </View>
        <View style={styles.switch}>
          <Text style={styles.text}>Set as Admin</Text>
          <Switch
            trackColor={{ false: Colors.error400, true: Colors.primary800 }}
            thumbColor={Colors.primary100}
            ios_backgroundColor="#c4c4c4"
            onValueChange={toggleSwitch}
            value={isChecked}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button styleButton={styles.button} onPress={submitHandler}>
            Add
          </Button>
          <Button styleButton={styles.button} onPress={onCancel}>
            Cancel
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AddMemberForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    width: wp('90%'),
    height: hp('35%'),
    backgroundColor: Colors.primary900,
    borderRadius: 20,
  },
  titleContainer: {
    height: '25%',
    width: '100%',
    backgroundColor: Colors.primary100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleContent: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary900,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomLeftRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary100,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: Colors.primary100,
    borderTopEndRadius: 30,
    justifyContent: "center",
    width: '100%',
    height: '35%',
  },
  errorText: {
    textAlign: "center",
    color: Colors.error500,
    margin: 8,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.primary100,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 15,
    color: Colors.primary900,
    marginVertical: 24,
  },
  buttonContainer: {
    width: '100%',
    height: '30%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: Colors.primary100,
  },
  button: {
    alignItems: "center",
    justifyContent: 'center',
    width: '70%',
    height: '50%',
  },
});
