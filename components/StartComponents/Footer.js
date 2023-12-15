import { StyleSheet, View, Text } from "react-native";

function Footer({ children }) {
  return (
    <View style={styles.footer}>
      <Text style={styles.textFooter}>{children}</Text>
    </View>
  );
}

export default Footer;

const styles = StyleSheet.create({
  footer: {
    height: "5%",
    justifyContent: "flex-start",
  },
  textFooter: {
    fontFamily: "open-sans",
    textAlign: "center",
    fontSize: 11,
  },
});
