import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default ({concludedTasks, pendingTasks}) => {
    const pieData = [
        {value: concludedTasks, color: '#177AD5'},
        {value: pendingTasks, color: 'lightgray'}
    ];
    return(
            <PieChart
                donut
                radius={50}
                innerRadius={30}
                data={pieData}
                centerLabelComponent={() => {
                return <Text style={{fontSize: 12}}>{concludedTasks }%</Text>;
                }}
            />
    );
}

const styles = StyleSheet.create({
    centerLabel: {
    }
})