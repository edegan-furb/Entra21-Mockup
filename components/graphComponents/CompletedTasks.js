import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";

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
                radius={50}
                innerRadius={30}
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
        height: '25%',
        width: '40%',
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