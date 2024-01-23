import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default ({concludedTasks, pendingTasks}) => {
    const pieData = [
        {value: concludedTasks, color: '#75da46'},
        {value: pendingTasks, color: '#baf39f'}
    ];
    return(
        <View>
            <PieChart
                radius={30}
                data={pieData}
            />
        </View>
    );
}