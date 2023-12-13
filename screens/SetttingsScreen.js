import { View, Text, StyleSheet} from "react-native";

function SettingsScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Settings!</Text>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
