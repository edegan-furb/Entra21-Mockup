import { View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { useTheme } from "../../store/theme-context";

function UpperLogo({ children }) {

  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Feather 
        name="check-square"
        size={17}
        color={colors.primary1000}
      />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

export default UpperLogo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    paddingLeft: "5%",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontFamily: "open-sans-bold",
  },
});
