import { View, Text, StyleSheet, SafeAreaView, Pressable, Modal} from "react-native";
import { AuthContext } from "../store/auth-context";
import { useContext, useState } from "react";
import { Colors } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import SettingsItem from "../components/Settings/SettingsItem";
import AboutText from "../components/Settings/AboutModal";

function SettingsScreen() {

  const authCtx = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

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
            <Text style={[styles.textInf, {fontSize: 25}]}>Julio Cesar Vanz</Text>
            <Text style={styles.textInf}>j.vanz1108@gmail.com</Text>
            <Text style={styles.textInf}>Registered groups: 5</Text>
          </View>         
        </View>
      </View>

      <View style={styles.containerBody}>
        <View style={styles.contentBody}>
          <Text style={styles.titleSettings}>Settings</Text>
          <SettingsItem
            nameIcon={"sunny-outline"}
            text={'Theme'}
            activeText={<Ionicons name={'moon'} size={15} color={Colors.primary100}/>}
            inActiveText={<Ionicons name={'sunny'} size={15} color={Colors.primary100}/>}
          />
          <SettingsItem
            nameIcon={"language-outline"}
            text={'Language'}
            activeText={'Br'}
            inActiveText={'En'}
          />
          <SettingsItem
            nameIcon={"help-circle-outline"}
            text={'About'}
            swich={true}
            onPress={() => setModalVisible(true)}
          />
          <SettingsItem
            nameIcon={"close-circle-outline"}
            text={'Delete account'}
            swich={true}
          />
          <SettingsItem
            nameIcon={"log-out-outline"}
            text={'Logout'}
            swich={true}
            onPress={authCtx.logout}
          />
        </View>
      </View>
      <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
      <AboutText 
        onPress={() => setModalVisible(false)}
      />
    </Modal>
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
    height: '35%',
    alignItems: "center",
    justifyContent: 'space-evenly',
    //flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: Colors.primary950,
  },
  iconEditContainer: {
    width: '100%',
    height: '15%',
    alignItems: "flex-end",
    justifyContent: 'center',
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
    width: '100%',
    height: '85%',
    alignItems: "center",
    justifyContent: 'space-around',
    //flexDirection: "row",
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
    width: '100%',
    height: '40%',
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textInf: {
    fontWeight: "bold",
    color: Colors.primary950,
    fontSize: 13
  },
  containerBody: {
    width: '100%',
    height: '70%',
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20
  },
  contentBody: {
    width: "80%",
    height: '50%',
  },
  titleSettings: {
    color: Colors.primary950,
    fontSize: 14,
    fontFamily: 'open-sans-bold'
  },
  modalContainer: {
    width: "100%",
    height: '100%',
    backgroundColor: '#ffffffef'
  },
  iconContent: {
    width: '100%',
    height: '5%',
    alignItems: "flex-start",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
