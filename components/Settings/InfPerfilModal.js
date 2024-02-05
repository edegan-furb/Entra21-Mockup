import { View, StyleSheet, Pressable} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/styles";

export default function ModalEditInformations({ onPress }) {
    return(
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Pressable onPress={onPress} style={styles.iconContent}>
                    <Ionicons name="close" size={30} color={Colors.neutral900}/>
                </Pressable>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#000000e7',
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    modalContent: { 
        width: '80%',
        height: '40%',
        backgroundColor: '#999',
    },
})