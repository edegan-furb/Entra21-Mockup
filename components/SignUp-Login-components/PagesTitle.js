import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/styles";

export default function PagesTitle({ title, subTitle }) {
  return(
    <View style={styles.titleContent}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContent: {
    width: "100%",
    height: "20%",
    alignItems: "start",
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    color: Colors.primary50,
    paddingLeft: "18%",
    fontFamily: "open-sans-bold",
  },
  subTitle: {
    color: Colors.primary50,
    fontSize: 20,
    paddingLeft: "18%",
    fontFamily: "open-sans-bold",
  },
})