import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import * as Progress from 'react-native-progress';
import { useTheme } from "../../store/theme-context";


export default function TaskHome({ deadline, taskName, groupName, taskProgress}) {

    const { colors } = useTheme();

    return(
        <View style={[styles.container, {backgroundColor: colors.swich400}]}>
            <View>
                <Text style={[styles.date, {color: colors.primary950}]}>{deadline}</Text>
            </View>

            <View style={styles.taskContainer}>
                <Ionicons
                    size={wp('16')} 
                    name="reader-outline"
                    color={colors.icons500}
                />
                <View style={styles.taskInfoContainer}>
                    <Text style={[styles.taskName, {color: colors.neutral1100}]} numberOfLines={3}>
                        {taskName}
                    </Text>
                    <Text style={[styles.groupName, {color: colors.neutral1100}]}>{groupName}</Text>
                </View>
            </View>

            <View style={styles.progressContainer}>
                <Text style={[styles.ProgressText, {color: colors.neutral1100}]}>Progress:</Text>
                <View style={styles.barContainer}>
                    <Progress.Bar 
                        progress={taskProgress}
                        color={Colors.icons500} 
                        width={wp('25%')} 
                    />
                    <Text style={{color: colors.neutral1100}}> { (taskProgress) * 100 }%</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '45%',
        height: hp('22%'),
        margin: wp('2%'),
        padding: '3%',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: Colors.primary50
    },
    taskContainer: {
        alignItems: 'center',
        height: '50%',
        maxWidth: '82%',
        marginTop: '10%',
        flexDirection: 'row'
    },
    taskInfoContainer:{
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        maxWidth: '70%',
    },
    ProgressText: {
        color: Colors.neutral1100
    },
    date: {
        fontSize: 13
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