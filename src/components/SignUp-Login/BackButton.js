// Back Button
import { StyleSheet, Pressable, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/styles";

export default function BackButton({onPress}) {
    return(
        <View style={styles.container} >
            <Pressable style={styles.backButtonContainer} onPress={onPress}>
                <Ionicons 
                    name="arrow-back-circle-outline" 
                    color={Colors.primary100} 
                    size={30} 
                    style={styles.backButton}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '25%',
        paddingLeft: '6%',
    },
    backButtonContainer: {
        width: '10%',
        height: '100%',
        borderRadius: 50,
        justifyContent: "flex-end",
    },
})