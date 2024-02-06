import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { Colors } from '../../constants/styles';

export default function WelcomeComp({ onPress }) {

    return (
        <Pressable 
            style={({ pressed }) => pressed ? [styles.pressed, styles.container] : styles.container}
            onPress={onPress}>

            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Welcome!
                </Text>
                <Text style={styles.text}>
                    Let's make today productive!
                </Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/productivity.png')}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        borderWidth: 1,
        padding: '2%',
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    textContainer: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.primary950
    },
    text: {
        fontSize: 14,
        color: Colors.primary800,
        textAlign: 'center'
    },
    imageContainer: {
        height: '100%',
        width: '50%',
    },
    image: {
        height: '100%',
        width: '100%'
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: Colors.primary100,
    },
})