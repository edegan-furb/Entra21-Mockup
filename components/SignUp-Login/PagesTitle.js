import { StyleSheet, View, Text, Image } from "react-native";
import { Colors } from "../../constants/styles";
import BackButton from './BackButton';
import { useNavigation } from "@react-navigation/native";

export default function PagesTitle({ title, subTitle, style }) {

  const navigation = useNavigation();

  function onPressHandler() {
      navigation.navigate('Start')
  }

  return(
    <View style={style}>
      <View style={styles.content}>
        <BackButton onPress={onPressHandler}/>
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