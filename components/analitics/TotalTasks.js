import React, { useState } from "react";
import { View, Text, StyleSheet} from "react-native";


export default props => {
    return (
        <View style={styles.container}>
                <Text style={styles.texto}>Number of active tasks: </Text>
                <Text style={styles.texto}>{props.numberOfTasks}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '15%',
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        flexDirection: "row"
    },
    texto: {
        fontSize: 20,
        flex: 1,
        paddingLeft: '3%',
        textAlign: 'left',
        textAlignVertical: 'center',
    }
})