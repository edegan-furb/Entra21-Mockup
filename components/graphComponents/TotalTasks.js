import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { 
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
}from "react-native-responsive-screen";

export default ({total}) => {
    
    return(
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>Total tasks:</Text>
            </View>

            <View style={styles.totalView}>
                <Text style={styles.total}>{total}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp('80%'),
        height: hp('8%'),
        borderColor: 'black',
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: 'lightgray',
        paddingLeft: '5%',
        flexDirection: 'row'
    },
    textView: {
        width: '70%',
        height: '100%',
        justifyContent: 'center'
    },
    text: {
        fontSize: 25
    },
    totalView: {
        width: '30%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderBlockColor: 'black',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 8
    },
    total: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'blue'
    }
})
