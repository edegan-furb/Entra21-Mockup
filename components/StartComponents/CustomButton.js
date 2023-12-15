// CustomButton.js
import { Pressable, Text, View, StyleSheet, Platform } from "react-native";
import { Colors } from "../../constants/styles";

function CustomButton({ title, onPress, styleButton, styleText }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressade, styleButton]
            : [styles.buttonInnerContainer, styleButton]
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary950 }}
      >
        <Text style={[styles.buttonText, styleText]}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 12,
    margin: "3%",
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary900,
    paddingVertical: "7%",
    borderWidth: 3,
    borderRadius: 12,
    borderColor: Colors.primary900,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
  pressade: {
    opacity: 0.5,
  },
});

export default CustomButton;
