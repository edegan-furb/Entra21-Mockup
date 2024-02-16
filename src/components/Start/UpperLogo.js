import { View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { useTheme } from "../../Context/theme-context";

function UpperLogo({ children, isStart }) {

  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Feather 
        name="check-square"
        size={17}
        color={isStart ? colors.icons900 : colors.icons50}
      />
      <Text style={[styles.text, isStart ? {color: colors.icons900} : {color: colors.text50}]}>{children}</Text>
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
