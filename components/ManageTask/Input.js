import { TextInput, View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/styles";

function Input({ label, style, textInputConfig, invalid }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultine);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 15,
    color: Colors.primary900,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colors.primary100,
    color: Colors.primary800,
    padding: 10,
    borderRadius: 6,
    fontSize: 15,
    borderWidth: 2,
    borderColor: Colors.primary900,
  },
  inputMultine: {
    minHeight: 80,
    textAlignVertical: "top",
    borderWidth: 2,
    borderColor: Colors.primary900,
  },
  invalidLabel: {
    color: Colors.error500,
  },
  invalidInput: {
    backgroundColor: Colors.error100,
  },
});
