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
    width: '90%',
    height: '30%',
  },
  label: {
    fontSize: 15,
    color: Colors.primary900,
    marginBottom: 12,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.primary900,
    color: Colors.primary900,
    padding: 15,
    borderRadius: 6,
    fontSize: 15,
  },
  inputMultine: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: Colors.error500,
  },
  invalidInput: {
    backgroundColor: Colors.error100,
  },
});
