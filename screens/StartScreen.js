import {
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import UpperLogo from '../components/Start/UpperLogo';
import Banner from '../components/Start/Banner';
import CustomButton from '../components/Start/CustomButton';
import Description from '../components/Start/Description';
import Footer from '../components/Start/Footer';
import { Colors } from '../constants/styles';

function StartScreen() {
    const navigation = useNavigation();
  
    function onPressHandler(page) {
      if (page === "Login") {
        navigation.navigate("Login"); 
      } else {
        navigation.navigate("Signup");
      }
    }
  
    return (
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.upperLogoContainer}>
          <UpperLogo children={"TaskSync"} isStart={true}/>
        </View>
        <Banner />
        <Description
          title={"Welcome !"}
          description={"Best place to create tasks and manage your teams"}
        />
        <View style={styles.buttonsContainer}>
          <CustomButton 
            title={"LOGIN"} 
            onPress={() => onPressHandler("Login")}
          />
          <CustomButton
            title={"SIGN UP"}
            styleButton={styles.signUpButton}
            styleText={styles.signText}
            onPress={() => onPressHandler("Signup")}
          />
        </View>
        <Footer
          children={
            "© Todos os direitos reservados \n Desenvolvido por Ariel Marcellino, Eduardo Degan e Julio Vanz"
          }
        />
      </SafeAreaView>
    );
  }
  
  export default StartScreen;
  
  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: Colors.neutral100,
      width: wp('100%'),
      height: hp('100%'),
    },
    upperLogoContainer: {
      height: "5%",
      justifyContent: "center",
    },
    buttonsContainer: {
      height: "30%",
      paddingHorizontal: "20%",
    },
    signUpButton: {
      backgroundColor: Colors.neutral100,
      borderColor: Colors.primary900,
    },
    signText: {
      color: Colors.primary900,
    },
  });