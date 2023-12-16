import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

function Button({ children, onPress, mode, styleButton }) {
  return (
    <View style={styleButton}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: "4.5%",
    paddingHorizontal: '25%',
    backgroundColor: Colors.primary800,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: '#fff',
    textAlign: "center",
    fontFamily: 'open-sans-bold',
    fontSize: 15
  },
  flatText: {
    color: Colors.primary100,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
});