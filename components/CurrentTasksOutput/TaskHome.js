import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";


import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import * as Progress from 'react-native-progress';
import { useTheme } from "../../store/theme-context";
import { useNavigation } from "@react-navigation/native";
import { GroupsContext } from "../../store/groups-context";
import { getFormattedDate } from "../../util/date";


export default function TaskHome({ date, title, objectives, completed, id, groupId}) {

    const navigation = useNavigation();

    function taskPressHandler() {
        navigation.navigate("TaskScreen", {
            previous: "Home",
            taskId: id,
            groupId: groupId,
            
        });
    }
    
    let numCompletedObjectives = objectives.filter(objective => (objective.completed === true)).length || 0;
    let numObjectives = objectives.length || 0;
    
    
    const progressCalc = function () {

        //  Getting the numebr of completed objectives 

        if (completed){//if the task has been completed the progress bar going to be 100%
          return 1;
        }
        if (typeof(numObjectives) != "number" || typeof(numCompletedObjectives) != "number" || numObjectives === 0){
          return 0;
        }
        const progress = (numCompletedObjectives / numObjectives);
        return parseFloat(progress.toFixed(2));
      }

    const { colors } = useTheme();
    
    //Getting the group name
    let groupName = useContext(GroupsContext).groups.find(g => (g.tasks.filter(t => t.id === id)).length === 1)?.title || null;


    return(
        <Pressable 
            style={({ pressed }) => 
                pressed ? 
                    [styles.pressed, styles.container, {backgroundColor: colors.background100}] 
                : [styles.container, {backgroundColor: colors.background100}]}

            onPress={taskPressHandler}
        >
            <View>
                <Text style={[styles.date, {color: colors.text200}]}>{getFormattedDate(date)}</Text>
            </View>

            <View style={styles.taskContainer}>
                <Ionicons
                    size={wp('16')} 
                    name="reader-outline"
                    color={colors.text200}
                />
                <View style={styles.taskInfoContainer}>
                    <Text style={[styles.taskName, {color: colors.text200}]} numberOfLines={3}>{title}</Text>
                    <Text style={[styles.groupName, {color: colors.text200}]} numberOfLines={2}>
                        <Ionicons name="people-outline" size={16}/> {groupName}
                    </Text>
                </View>
            </View>

            <View style={styles.progressContainer}>
                <Text style={[styles.ProgressText, {color: colors.text200}]}>
                    <Feather name="target" color={Colors.text200} size={16}/> {numCompletedObjectives}/{numObjectives}
                </Text>
                <View style={styles.barContainer}>
                    <Progress.Bar 
                        progress={progressCalc()}
                        color={colors.text200} 
                        width={wp('25%')} 
                    />
                    <Text style={{color: colors.text200}}> { (progressCalc()) * 100 }%</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '45%',
        height: hp('22%'),
        margin: '2.5%',
        padding: '3%',
        borderWidth: 1,
        borderRadius: 20,
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
    },
    pressed: {
        opacity: 0.75,
    }
})