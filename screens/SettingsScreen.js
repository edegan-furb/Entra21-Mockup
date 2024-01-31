import { View, Text, StyleSheet, SafeAreaView, Pressable} from "react-native";
import { AuthContext } from "../store/auth-context";
import { useContext, useState } from "react";
import { Colors } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Switch } from "react-native-switch";


function SettingsScreen() {

  const authCtx = useContext(AuthContext);

  const [icon, setIcon] = useState(true);
  const [language, setLanguage] = useState(true);

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
        <View style={styles.blocksContainer}>
          <View style={styles.blockContent}>
            <Text style={styles.blockText}>Change theme</Text>
            <Switch
              activeText={<Ionicons name="sunny-outline" size={20} color={'#000'}/>}
              inActiveText={<Ionicons name="moon-outline" size={20} color={'#fff'}/>}
              value={icon}
              onValueChange={(valor) => setIcon(valor)}
              backgroundActive={Colors.primary100}
              circleActiveColor={Colors.primary950}
              backgroundInactive={Colors.neutral800}
              circleInActiveColor={Colors.primary950}
              circleSize={35}
              barHeight={40}
              switchWidthMultiplier={2.8}
            />
          </View>


          <View style={styles.blockContent}>
            <Text style={styles.blockText}>Change language</Text>
            <Switch
              activeText={'En'}
              inActiveText={'Pt-br'}
              value={language}
              onValueChange={(valor) => setLanguage(valor)}
              backgroundActive={Colors.primary500}
              circleActiveColor={Colors.primary950}
              backgroundInactive={Colors.primary500}
              circleInActiveColor={Colors.primary950}
              circleSize={35}
              barHeight={40}
              switchWidthMultiplier={2.8}
            />
          </View>
        </View>
        
        
        

        
        <View style={styles.blocksContainer}>
          <View style={styles.blockContent}>
            <Text style={styles.blockText}>Change theme</Text>
            <Switch
              activeText={<Ionicons name="sunny-outline" size={20} color={'#000'}/>}
              inActiveText={<Ionicons name="moon-outline" size={20} color={'#fff'}/>}
              value={icon}
              onValueChange={(valor) => setIcon(valor)}
              backgroundActive={Colors.primary100}
              circleActiveColor={Colors.primary950}
              backgroundInactive={Colors.neutral800}
              circleInActiveColor={Colors.primary950}
              circleSize={35}
              barHeight={40}
              switchWidthMultiplier={2.8}
            />
          </View>


          <View style={styles.blockContent}>
            <Text style={styles.blockText}>Change language</Text>
            <Switch
              activeText={'En'}
              inActiveText={'Pt-br'}
              value={language}
              onValueChange={(valor) => setLanguage(valor)}
              backgroundActive={Colors.primary500}
              circleActiveColor={Colors.primary950}
              backgroundInactive={Colors.primary500}
              circleInActiveColor={Colors.primary950}
              circleSize={35}
              barHeight={40}
              switchWidthMultiplier={2.8}
            />
          </View>
        </View>
        <Pressable style={({ pressed }) => pressed ? [styles.btnExit, styles.pressed] : styles.btnExit} onPress={authCtx.logout}>
          <View style={styles.textContainer}>
            <Text style={styles.btnText}>Logout</Text> 
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="log-out-outline" size={20} color={'#000'} style={styles.icon}/>
          </View>
        </Pressable>

        <Pressable style={({ pressed }) => pressed ? [styles.btnExit, styles.pressed] : styles.btnExit}>
          <View style={styles.textContainer}>
            <Text style={styles.btnText}>Delet account</Text> 
          </View>
          <View style={styles.iconContainer}>
            <AntDesign name="deleteuser" size={20} color={'#000'} style={styles.icon}/>
          </View>
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
    backgroundColor: Colors.primary100,
  },
  pictureContainer: {
    width: '90%',
    height: '30%',
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderColor: Colors.primary950,
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
    justifyContent: "space-around",
  },
  blocksContainer: {
    width: '90%',
    height: '30%',
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderRadius: 25,
    //borderTopLeftRadius: 70,
    // borderBottomLeftRadius: 3,
    // borderBottomRightRadius: 70,
    backgroundColor: Colors.primary900
  },
  blockContent: { 
    width: "40%",
    height: '90%',
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: '#ffffff77',
    borderRadius: 40
  },
  blockText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: Colors.primary950,
  },



  btnExit: {
    height: '12%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: Colors.primary900
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ffffff36',
    width: '15%',
    height: '100%',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: '85%',
    height: '100%',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    
  },
  btnText: {
    fontSize: 19,
    fontFamily: 'open-sans-bold',
  },
  pressed: {
    opacity: 0.7,
  },



});
