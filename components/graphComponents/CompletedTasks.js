import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { 
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
}from "react-native-responsive-screen";

export default ({concludedTasks}) => {
    
    const pendingTasks = 100 - concludedTasks

    const pieData = [
        {value: concludedTasks, color: 'green'},
        {value: pendingTasks, color: 'lightgray'}
    ];
    return(
        <View style={styles.container}>
            <PieChart
                donut
                radius={hp('6%')}
                innerRadius={hp('4%')}
                data={pieData}
                centerLabelComponent={() => {
                return <Text style={{fontSize: 12}}>{concludedTasks }%</Text>;
                }}
            />
            <Text style={styles.texto}>Completed Tasks</Text>
        </View>
    
    
    );
}

const styles = StyleSheet.create({
    container: {
        height: hp('20%'),
        width: wp('35%'),
        marginTop: hp('2%'),
        marginRight: wp('4%'),
        borderBlockColor: 'black',
        borderWidth: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: '2%',
        borderRadius: 8,
        backgroundColor: '#ffffff'
    },
    texto: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 16
    }
})