import { View, Text, StyleSheet } from "react-native";

function Description({ title, description }) {
  return (
    <View style={styles.descriptionContainer}>
      <View>
        <Text style={styles.descriptionTitle}>{title}</Text>
      </View>
      <View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

export default Description;

const styles = StyleSheet.create({
  descriptionContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
  },
  descriptionTitle: {
    fontSize: 32,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 17,
    fontFamily: "open-sans",
    textAlign: "center",
    paddingHorizontal: "5%",
    paddingTop: "2%",
  },
});
