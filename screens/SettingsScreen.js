import { View, Text, StyleSheet, SafeAreaView, Pressable} from "react-native";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import { Colors } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import { Ionicons } from '@expo/vector-icons';

function SettingsScreen() {

  const authCtx = useContext(AuthContext);
  
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.pictureContainer}>
        <View style={styles.pictureContent}>
          <View style={styles.picture}>
            <IconButton icon={'person-outline'} color={'#fff'} size={60}/>
          </View>          
        </View>
      </View>

      <View style={styles.contentBody}>

        <Pressable style={styles.btnExit}>
          <View style={styles.iconContainer}>
            <Ionicons name="information-circle-outline" size={25} color={'#000'} style={styles.icon}/>
          </View>
          <View style={styles.textContainer}>
            <Text>Help</Text> 
          </View>
        </Pressable>

        <Pressable onPress={authCtx.logout} style={styles.btnExits}>
          <Text>Exit</Text>
        </Pressable>
      </View>
      








      
    </SafeAreaView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  pictureContainer: {
    width: '90%',
    height: '30%',
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderColor: Colors.primary950
  },
  pictureContent: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Colors.primary950,
    alignItems: "center",
    justifyContent: "center",
  },
  picture: {
    width: '95%',
    height: '95%',
    borderRadius: 100,
    backgroundColor: Colors.primary900,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: Colors.primary950,
  },
  contentBody: {
    width: '100%',
    height: '70%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#888'
  },
  btnExit: {
    height: '10%',
    width: '80%',
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: '#555'
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#9999993b',
    width: 40,
    height: 40,
    borderRadius: 5
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: '85%',
    height: '100%',
    borderBottomWidth: 3,
    borderColor: Colors.primary950,
  },




  btnExits: {
    height: '10%',
    width: '80%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#555'
  }
});
