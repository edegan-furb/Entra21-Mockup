import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
} from "react-native";

import { Colors } from "../../constants/styles";

export default function ButtonGoogleLogin() {
    return(
        <View style={styles.container}>
            <View style={styles.dividerContent}>
                <View style={styles.divider}></View>
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.divider}></View>
            </View>
            <Pressable style={styles.googleButton}>
                <Image 
                    source={require('../../assets/images/google.png')} 
                    style={styles.logoGoogle}
                />
                <Text style={styles.buttonText}>LOGIN WITH GOOGLE</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        justifyContent: "center",
    },
    dividerContent: {
        height: '50%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        gap: 8,
    },
    divider: {
        width: '33%',
        height: '4%',
        backgroundColor: Colors.primary800
    },
    dividerText: {
        fontWeight: 'bold',
        color: Colors.primary950,
    },
    googleButton: {
        backgroundColor: Colors.neutral100,
        paddingVertical: "4.5%",
        paddingHorizontal: '7.5%',
        borderWidth: 2,
        borderRadius: 12,
        borderColor: Colors.primary800,
        elevation: 8,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        gap: 10
    },
    buttonText: {
        fontSize: 15,
        fontFamily: "open-sans-bold",
        color: Colors.primary800,
    },
    logoGoogle: {
        width: '5%',
        height: '100%'
    }
})