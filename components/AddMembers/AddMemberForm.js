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
        </View>
        <View style={styles.switch}>
          <View style={styles.switchContent}> 
            <Text style={styles.text}>Set as Admin</Text>
            <Switch
              trackColor={{ false: Colors.neutral400, true: Colors.primary500 }}
              thumbColor={Colors.primary800}
              ios_backgroundColor="#979797"
              onValueChange={toggleSwitch}
              value={isChecked}
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            />
          </View>
          {formIsInvalid && (
              <Text style={styles.errorText}>
                Invalid email - please check your entered data
              </Text>
            )}
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
    height: hp('40%'),
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
    justifyContent: "flex-end",
    width: '100%',
    height: '35%',
  },
  switch: {
    alignItems: "flex-start",
    height: '25%',
    backgroundColor: Colors.primary100,
  },
  switchContent: {
    flexDirection: "row",
    alignItems: "center",
    height: '50%',
    width: '100%',
    paddingHorizontal: 12,
    gap: 10,
  },
  text: {
    fontSize: 15,
    color: Colors.primary900,
  },
  errorText: {
    color: Colors.error500,
    paddingHorizontal: 30
  },
  buttonContainer: {
    width: '100%',
    height: '30%',
    flexDirection: "row",
    alignItems: "flex-start",
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
