import React from "react";
import { Text, StyleSheet } from "react-native";
import { Colors } from '../../constants/styles';

export default function HiComp({ name }) {
    return (
        <Text style={styles.text}>
            Hi {name}!
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        fontWeight: "bold",
        color: Colors.primary950
    }
})