import React from "react";
import {View, Text, StyleSheet, Image} from 'react-native';
import { 
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
}from "react-native-responsive-screen";
import { Colors } from '../../constants/styles';

export default props => {
    return(
        <View style={styles.container}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp('90%'),
        height: hp('15%'),
        borderRadius: 8,
        borderWidth: 1,
        margin: hp('2%'),
        padding: '2%',
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    textContainer:{
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
        fontSize: 18,
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
    }
})