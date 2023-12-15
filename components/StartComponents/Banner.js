import { View, Image, StyleSheet } from "react-native";

function Banner() {
  return (
    <View style={styles.container}>
      <Image
        resizeMethod="auto"
        resizeMode="contain"
        style={styles.bannerImage}
        source={require("../../assets/images/undraw.png")}
      />
    </View>
  );
}

export default Banner;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "40%",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
});
