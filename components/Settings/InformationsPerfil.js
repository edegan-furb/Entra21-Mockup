import { View, Text, StyleSheet, Pressable, Modal} from "react-native";
import IconButton from "../ui/IconButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from "../../constants/styles";
import { useState } from "react";
import ModalEditInformations from "./InfPerfilModal";

export default function ModalInformationsPerfil() {

    const [modalVisible, setModalVisible] = useState(false);

    return(
        <>
            <View style={styles.iconEditContainer}>
            <Pressable 
                style={({ pressed }) => pressed ? [styles.iconEdit, styles.pressed] : styles.iconEdit}
                onPress={() => setModalVisible(true)}
            >
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

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <ModalEditInformations
                    onPress={() => setModalVisible(false)}
                />
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
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
        elevation: 4,
        shadowColor: Colors.primary950,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .4,
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
})