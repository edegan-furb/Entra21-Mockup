import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useTheme } from "../../store/theme-context";

export default function WelcomeComp({ onPress }) {

    const { colors } = useTheme();

    return (
        <Pressable 
            style={({ pressed }) => pressed ? [styles.pressed, styles.container] : [styles.container, {backgroundColor: colors.background100}]}
            onPress={onPress}
        >
            <View style={styles.textContainer}>
                <Text style={[styles.title, {color: colors.swich950}]}>
                    Welcome!
                </Text>
                <Text style={[styles.text, {color: colors.text200}]}>
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
    },
    text: {
        fontSize: 14,
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
    },
})