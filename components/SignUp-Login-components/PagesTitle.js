import { StyleSheet, View, Text, Image } from "react-native";
import { Colors } from "../../constants/styles";
import BackButton from '../SignUp-Login-components/BackButton';

export default function PagesTitle({ title, subTitle }) {
  return(
    <View style={styles.container}>
      <View style={styles.content}>
        <BackButton/>
        <View style={styles.imgContainer}>
          <Image 
            resizeMethod="scale"
            resizeMode="center"
            style={styles.bannerImage}
            source={require("../../assets/images/teams4.png")}
          />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.titleContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "40%",
    alignItems: "flex-start",
    justifyContent: 'flex-start',
    backgroundColor: Colors.neutral100,
  },
  content: {
    width: '100%',
    height: '50%',
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomLeftRadius: 50,
    backgroundColor: Colors.primary800
  },
  imgContainer: {
    width: '100%',
    height: '85%',
    alignItems:"center"
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    width: '100%',
    height: '40%',
    backgroundColor: Colors.primary800
  },
  titleContent: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    backgroundColor: Colors.neutral100,
    borderTopRightRadius: 50,
    paddingLeft: "7%",
  },
  title: {
    fontSize: 40,
    color: Colors.primary800,
    fontFamily: "open-sans-bold",
  },
  subTitle: {
    color: Colors.primary800,
    fontSize: 20,
    fontFamily: "open-sans-bold",
  },
})