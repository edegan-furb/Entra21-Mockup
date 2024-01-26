import React from "react";
import { Text, StyleSheet } from "react-native";
import { Colors } from '../../constants/styles'

export default ({ name }) => {
    return (
        <Text style={styles.text}>
            Hi {name}!
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: '5%',
        marginLeft: '5%',
        fontSize: 28,
        fontWeight: "bold",
        color: Colors.primary950
    }
})