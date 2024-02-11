import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import Input from "../AddMembers/Input";
import Button from "../ui/Button";
import { useState } from "react";
import { Switch } from "react-native-switch";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "../../store/theme-context";

function AddMemberForm({ onCancel, onSubmit }) {

  const { colors } = useTheme();

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
      <View style={[styles.form, { backgroundColor: colors.background900 }]}>
        <View style={[styles.titleContainer, { backgroundColor: colors.background50 }]}>
          <View style={[styles.titleContent, { backgroundColor: colors.background900 }]}> 
            <Text style={[styles.title, { color: colors.text700 }]}>Add Members</Text>
          </View>
        </View>
        <View style={[styles.inputContainer, { backgroundColor: colors.background50 }]}>
          <Input
            label={"User by Email"}
            textInputConfig={{
              multiline: false,
              onChangeText: inputChangeHandler.bind(this, "email"),
            }}
          />
        </View>
        <View style={[styles.switch, { backgroundColor: colors.background50 }]}>
          <View style={styles.switchContent}> 
            <Text style={[styles.text, { color: colors.text900 }]}>Set as Admin</Text>
            <Switch
              activeText={''}
              inActiveText={''}
              backgroundActive={colors.swich500}
              backgroundInactive={colors.swich400}
              circleActiveColor={colors.swich200}
              circleInActiveColor={colors.swich200}
              onValueChange={toggleSwitch}
              value={isChecked}
              circleSize={20}
              barHeight={25}
              switchWidthMultiplier={2.5} 
            />
          </View>
          {formIsInvalid && (
              <Text style={[styles.errorText, {color: colors.error500}]}>
                Invalid email - please check your entered data
              </Text>
            )}
        </View>
        <View style={[styles.buttonsContainer, { backgroundColor: colors.background50 }]}>
          <View style={styles.buttonContent}>
            <Button mode={"flat"} onPress={onCancel}>
              Cancel
            </Button>
            <Button onPress={submitHandler}>
              Add
            </Button>
          </View>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}

export default AddMemberForm;

const styles = StyleSheet.create({
  form: {
    marginTop: '30%',
    width: wp('95%'),
    height: hp('40%'),
    borderRadius: 20,
  },
  titleContainer: {
    height: '25%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleContent: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomLeftRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    borderTopEndRadius: 30,
    justifyContent: "flex-end",
    width: '100%',
    height: '35%',
  },
  switch: {
    alignItems: "flex-start",
    height: '20%',
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
    fontWeight: "600"
  },
  errorText: {
    paddingHorizontal: 30
  },
  buttonsContainer: {
    width: '100%',
    height: '25%',
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  buttonContent: {
    width: '70%',
    height: '50%',
    gap: 10,
    flexDirection: "row",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  }
});
