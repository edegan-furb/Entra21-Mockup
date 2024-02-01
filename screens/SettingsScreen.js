import { View, Text, StyleSheet, SafeAreaView, Pressable} from "react-native";
import { AuthContext } from "../store/auth-context";
import { useContext, useState } from "react";
import { Colors } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Switch } from "react-native-switch";


function SettingsScreen() {

  const authCtx = useContext(AuthContext);

  const [icon, setIcon] = useState(true);
  const [language, setLanguage] = useState(true);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.main}>
        <View style={styles.iconEditContainer}>
          <Pressable style={({ pressed }) => pressed ? [styles.iconEdit, styles.pressed] : styles.iconEdit}>
            <MaterialCommunityIcons name="lead-pencil" color={Colors.primary1000} size={18} />
          </Pressable>
        </View>

        <View style={styles.pictureContainer}>
          <View style={styles.pictureContent}>
            <View style={styles.picture}>
              <IconButton icon={'person-outline'} color={'#fff'} size={60}/>
            </View>
          </View>
          <View style={styles.infContainer}>
            <Text style={styles.textInf}>Name: Julio Cesar Vanz</Text>
            <Text style={styles.textInf}>Email: j.vanz1108@gmail.com</Text>
            <Text style={styles.textInf}>Registered groups: 5</Text>
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
              activeText={<Text style={{fontSize: 12}}>En</Text>}
              inActiveText={<Text style={{fontSize: 12}}>Pt</Text>}
              value={language}
              onValueChange={(valor) => setLanguage(valor)}
              backgroundActive={Colors.primary500}
              circleActiveColor={Colors.primary950}
              backgroundInactive={Colors.primary500}
              circleInActiveColor={Colors.primary950}
              circleSize={35}
              barHeight={40}
              switchWidthMultiplier={2.7}
            />
          </View>
        </View>
        
        <View style={styles.test}>

        </View>
        

        
        
          <View style={styles.btnContainer}>
            <Pressable style={({ pressed }) => pressed ? [styles.btnExit, styles.pressed] : styles.btnExit} onPress={authCtx.logout}>
              <View style={styles.textContainer}>
                <Text style={styles.btnText}>Logout</Text> 
              </View>
              <View style={styles.iconContainer}>
                <Ionicons name="log-out-outline" size={15} color={'#fff'} style={styles.icon}/>
              </View>
            </Pressable>

            <Pressable style={({ pressed }) => pressed ? [styles.btnExit, styles.pressed] : styles.btnExit}>
              <View style={styles.textContainer}>
                <Text style={styles.btnText}>Delet account</Text> 
              </View>
              <View style={styles.iconContainer}>
                <AntDesign name="deleteuser" size={15} color={'#fff'} style={styles.icon}/>
              </View>
            </Pressable>
          </View>
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
  main: {
    width: '90%',
    height: '30%',
    alignItems: "center",
    justifyContent: 'space-around',
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: Colors.primary950,
  },
  iconEditContainer: {
    width: '5%',
    height: '70%',
    alignItems: "center",
  },
  iconEdit: {
    backgroundColor: '#2e106569',
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  pictureContainer: {
    width: '95%',
    height: '100%',
    alignItems: "center",
    justifyContent: 'space-around',
    flexDirection: "row",
    borderColor: Colors.primary950,
  },
  pictureContent: {
    width: 100,
    height: 100,
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
  infContainer: {
    width: '65%',
    height: '50%',
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  textInf: {
    fontWeight: "bold",
    color: Colors.primary950,
    fontSize: 13
  },


  contentBody: {
    width: '100%',
    height: '70%',
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20
  },
  blocksContainer: {
    width: '90%',
    height: '30%',
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
    fontSize: 15,
    color: Colors.primary950,
  },

  test: {
    width: '90%',
    height: '2%',
  },

  btnContainer: {
    width: '90%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: Colors.primary300
  },
  btnExit: {
    height: '35%',
    width: '40%',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: Colors.primary900
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ffffff36',
    width: '20%',
    height: '100%',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: '80%',
    height: '100%',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    
  },
  btnText: {
    fontSize: 13,
    color: Colors.primary100,
    fontFamily: 'open-sans-bold',
  },
  pressed: {
    opacity: 0.7,
  },
});
