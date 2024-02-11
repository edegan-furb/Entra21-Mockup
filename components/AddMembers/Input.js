import { TextInput, View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/styles";
import { useTheme } from "../../store/theme-context";

function Input({ label, style, textInputConfig, invalid }) {
  const inputStyles = [styles.input];

  const { colors } = useTheme();

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultine);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, {color: colors.text900},invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 600
  },
  input: {
    padding: 8,
    borderRadius: 6,
    fontSize: 15,
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: "#4c1d95",
    color: "#ddd6fe",
  },
  inputMultine: {
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: '#333'
  },
  invalidLabel: {
    color: Colors.error500,
  },
  invalidInput: {
    backgroundColor: Colors.error100,
  },
});
