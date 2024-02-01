import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default ({concludedTasks }) => {
    const pieData = [
        {value: concludedTasks, color: '#3bcc60'},
        {value: 100 - concludedTasks, color: '#e4e4e4'}
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