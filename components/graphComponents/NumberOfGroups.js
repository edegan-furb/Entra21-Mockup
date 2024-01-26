import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default ({number}) => {
    
    return(
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>Number of groups:</Text>
            </View>

            <View style={styles.numberView}>
                <Text style={styles.number}>{number}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '45%',
        height: '10%',
        borderColor: 'black',
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: 'lightgray',
        paddingLeft: '2%',
        flexDirection: 'row'
    },
    textView: {
        width: '60%',
        height: '100%',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    numberView: {
        width: '40%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderBlockColor: 'black',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 8
    },
    number: {
        fontSize: 30,
        fontWeight: "bold",
        color: '#EC241D'
    }
})
