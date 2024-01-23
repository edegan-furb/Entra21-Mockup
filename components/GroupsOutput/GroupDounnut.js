import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default ({concludedTasks, pendingTasks}) => {
    const pieData = [
        {value: concludedTasks, color: '#1eee39'},
        {value: pendingTasks, color: '#e4e4e4'}
    ];
    return(
        <View>
            <PieChart
                radius={25}
                data={pieData}
            />
        </View>
    );
}