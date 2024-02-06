import { View, Text, StyleSheet, SafeAreaView, Pressable, Modal} from "react-native";
import { AuthContext } from "../store/auth-context";
import { useContext, useState } from "react";
import { Colors } from "../constants/styles";
import { Ionicons } from '@expo/vector-icons';
import SettingsItem from "../components/Settings/SettingsItem";
import InfPerfil from "../components/Settings/InformationsPerfil";
import ModalInformationsPerfil from "../components/Settings/AboutModal";

function SettingsScreen() {

  const authCtx = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.contentPerfil}>
        <InfPerfil/>
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
        <ModalInformationsPerfil 
          onPress={() => setModalVisible(false)}
        />
    </Modal>
    </SafeAreaView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    backgroundColor: Colors.primary100,
  },
  contentPerfil: {
    width: '90%',
    height: '35%',
    borderBottomWidth: 2,
    borderColor: Colors.primary950,
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
