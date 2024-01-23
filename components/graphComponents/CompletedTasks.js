import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function Donut({concludedTasks, pendingTasks}) {
    const pieData = [
        {value: concludedTasks, color: '#177AD5'},
        {value: pendingTasks, color: 'lightgray'}
    ];
    return(
        <View>
            <PieChart
                donut
                radius={20}
                innerRadius={10}
                data={pieData}
                centerLabelComponent={() => {
                return <Text style={{fontSize: 12}}>{concludedTasks }%</Text>;
                }}
            />
        </View>
    
    
    );
}
