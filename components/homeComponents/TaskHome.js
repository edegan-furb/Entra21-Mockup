import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import * as Progress from 'react-native-progress';

export default function TaskHome({ deadline, taskName, groupName, taskProgress}) {
    return(
        <View style={styles.container}>
            <View>
                <Text>{deadline}</Text>
            </View>

            <View style={styles.taskContainer}>
                <Ionicons
                    size={hp('7%')} 
                    name="reader-outline"
                    color={Colors.primary600}
                />
                <View style={styles.taskInfoContainer}>
                    <Text style={styles.taskName}>{taskName}</Text>
                    <Text style={styles.groupName}>{groupName}</Text>
                </View>
            </View>

            <View style={styles.progressContainer}>
                <Text style={styles.ProgressText}>Progress:</Text>
                <View style={styles.barContainer}>
                    <Progress.Bar 
                        progress={taskProgress}
                        color={Colors.primary600} 
                        width={wp('25%')} />
                    <Text> { (taskProgress) * 100 }%</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '46%',
        height: hp('22%'),
        margin: wp('2%'),
        padding: '3%',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    taskContainer: {
        height: '50%',
        marginTop: '5%',
        flexDirection: 'row'
    },
    taskInfoContainer:{
        height: '100%',
        maxWidth: '70%',
    },
    ProgressText: {
        color: Colors.neutral1100
    },
    taskName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        color: Colors.neutral1100
    },
    groupName: {
        fontSize: 12,
        color: Colors.neutral1100
    },
    barContainer:{
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    progressContainer: {
        marginTop: '0.5%'
    }
})