// Back Button
import { StyleSheet, Pressable, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
    const navigation = useNavigation();

    function onPressHandler() {
        navigation.navigate('Start')
    }

    return(
        <View style={styles.container}>
            <Pressable style={styles.backButtonContainer} onPress={onPressHandler}>
                <Ionicons 
                    name="ios-arrow-back" 
                    color={'#fff'} 
                    size={35} 
                    style={styles.backButton}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '5%',
        paddingLeft: '7%',
        justifyContent: "center",
    },
    backButtonContainer: {
        width: '10%',
        height: '100%',
        borderRadius: 50,
    },
})