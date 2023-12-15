import { View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons'; 

function UpperLogo({ children }) {
  return (
    <View style={styles.container}>
      <Feather 
        name="check-square"
        size={22}
        color={'#000'}
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
    fontSize: 19,
    fontFamily: "open-sans-bold",
  },
});
