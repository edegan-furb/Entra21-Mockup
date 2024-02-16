import { View, Text, StyleSheet, SafeAreaView, Modal, Alert } from "react-native";
import { AuthContext } from "../Context/auth-context";
import React, { useState, useContext } from "react";
import SettingsItem from "../components/Settings/SettingsItem";
import InfPerfil from "../components/Settings/InformationsPerfil";
import ModalInformationsPerfil from "../components/Settings/AboutModal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "../Context/theme-context";
import TranslatedText from "../Context/language-context";
import { deleteAccount } from "../util/firebase/firestore/user";

function SettingsScreen() {

  const { colors } = useTheme();

  const authCtx = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  async function deleteAccountHandler() {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteAccount();
              // Account deletion was successful, now log the user out
              authCtx.logout(); // Call the logout function from your AuthContext
            } catch (error) {
              console.error("Error deleting account:", error.message);
              // Optionally, inform the user that the account deletion failed
            }
          }
        }
      ]
    );
  }

  return (
    <SafeAreaView style={[styles.rootContainer, { backgroundColor: colors.background50 }]}>
      <View style={[styles.contentPerfil, { borderBottomWidth: 2, borderColor: colors.border500, }]}>
        <InfPerfil />
      </View>

      <View style={styles.containerBody}>
        <View style={styles.contentBody}>
          <Text style={[styles.titleSettings, { color: colors.text900 }]}>Settings</Text>
          <SettingsItem
            nameIcon={"sunny-outline"}
            text={
              <TranslatedText
                enText="Theme"
                ptText="Tema"
              />
            }
            activeText={"🌙"}
            inActiveText={"☀"}
            swichTheme={true}
            swich={true}
          />
          <SettingsItem
            nameIcon={"language-outline"}
            text={
              <TranslatedText
                enText="Language"
                ptText="Idioma"
              />
            }
            activeText={'Br'}
            inActiveText={'En'}
            swichLanguage={true}
            swich={true}
          />
          <SettingsItem
            nameIcon={"help-circle-outline"}
            text={
              <TranslatedText
                enText="About"
                ptText="Sobre"
              />
            }
            onPress={() => setModalVisible(true)}
          />
          <SettingsItem
            nameIcon={"close-circle-outline"}
            text={
              <TranslatedText
                enText="Delete account"
                ptText="Deletar conta"
              />
            }
            onPress={deleteAccountHandler}
          />
          <SettingsItem
            nameIcon={"log-out-outline"}
            text={
              <TranslatedText
                enText="Logout"
                ptText="Sair"
              />
            }
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
    height: '65%',
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
