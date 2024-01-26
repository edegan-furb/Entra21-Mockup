import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import { 
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
}from "react-native-responsive-screen";

export default function(){
    <View style={styles.container}>
        <Text>OI</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: wp('90%'),
        height: hp('20%'),
        borderWidth: 1
    }
})