import { View, Text, StyleSheet, SafeAreaView, Modal} from "react-native";
import { AuthContext } from "../store/auth-context";
import React, { useState, useContext } from "react";
import { Colors } from "../constants/styles";
import { Ionicons } from '@expo/vector-icons';
import SettingsItem from "../components/Settings/SettingsItem";
import InfPerfil from "../components/Settings/InformationsPerfil";
import ModalInformationsPerfil from "../components/Settings/AboutModal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "../store/theme-context";

function SettingsScreen() {

  const { colors } = useTheme();

  const authCtx = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.rootContainer, {backgroundColor: colors.background50}]}>
      <View style={[styles.contentPerfil, {borderBottomWidth: 2, borderColor: colors.border500,}]}>
        <InfPerfil/>
      </View>

      <View style={styles.containerBody}>
        <View style={styles.contentBody}>
          <Text style={[styles.titleSettings, {color: colors.text900}]}>Settings</Text>
          <SettingsItem
            nameIcon={"sunny-outline"}
            text={'Theme'}
            activeText={<Ionicons name={'moon'} size={15} color={colors.swich200}/>}
            inActiveText={<Ionicons name={'sunny'} size={15} color={colors.swich200}/>}
            swichTheme={true}
          />
          <SettingsItem
            nameIcon={"language-outline"}
            text={'Language'}
            activeText={'Br'}
            inActiveText={'En'}
            swichLanguage={true}
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
    width: wp('100%'),
    height: hp('100%'),
    alignItems: "center",
  },
  contentPerfil: {
    width: '90%',
    height: '35%',
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
