import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Progress from 'react-native-progress';

import { Colors } from "../../constants/styles";
import { useTheme } from '../../store/theme-context'; // Adj
import { Ionicons, Foundation } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import TranslatedText from "../../store/language-context";

function GroupItem({ id, title, tasks, members }) {

  const { colors } = useTheme();
  const navigation = useNavigation();

  const [numberOfTasks, setNumberOfTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const amountMembers = members || [];
  const numberMembers = amountMembers.length;
  
  // Atualiza o estado local sempre que as tarefas compartilhadas mudarem
  useEffect(() => {
      // Verifica se tasks está definido antes de chamar filter
      const completedTasksCount = tasks ? tasks.filter(task => task.completed).length : 0;
      setNumberOfTasks(tasks ? tasks.length : 0);
      setCompletedTasks(completedTasksCount);
  }, [tasks]);

  // Cálculos relacionados às tarefas
  const numberCompletedTasks = numberOfTasks === 0 ? 0 : (completedTasks / numberOfTasks) * 100;
  const progress = numberOfTasks === 0 ? 0 : completedTasks / numberOfTasks;

  function groupPressHandler() {
    navigation.navigate("GroupScreen", {
      groupId: id,
    });
  }

  return (
    <Pressable
      onPress={groupPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.groupItem, { backgroundColor: colors.background900, }]}>
        <View style={styles.content}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, {color: colors.text700}]}>{title}</Text>
            </View>
            <View style={styles.infGroupsContainer}>
              <View style={styles.infGroups}>
                <Ionicons name="people" color={colors.text700} size={17} />
                <Text style={[styles.infTitleGroup, {color: colors.text700}]}>
                 {numberMembers}
                </Text>
              </View>
              <View style={styles.infGroups}>
                <Foundation name="clipboard-pencil" color={colors.text700} size={17}/>
                <Text style={[styles.infTitleGroup, {color: colors.text700}]}>
                  {`${completedTasks}/${numberOfTasks}`}
               </Text>
              </View>  
            </View>
          </View>
          <View style={styles.graphiContainer}>
            <TranslatedText
              enText={`Concluded ${numberCompletedTasks.toFixed(0)}%`}
              ptText={`Concluído ${numberCompletedTasks.toFixed(0)}%`}
              style={[styles.graphiTextInf, {color: colors.text700}]}
            />
              <Progress.Bar 
                progress={progress}
                color={colors.background300} 
                width={100} 
                animationType={"timing"}
                
              />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default GroupItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  groupItem: {
    width: '100%',
    height: 105,
    backgroundColor: Colors.primary950,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: 'row',
    marginVertical: 8,
    borderRadius: 5,
    elevation: 4,
    shadowColor: Colors.primary950,
    shadowRadius: 2,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: .3,
  },
  content: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  container: {
    paddingLeft: '10%',
    width: '55%',
    alignItems: "center",
    justifyContent: "center"
  },
  titleContainer: {
    width: '100%',
    height: '45%',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infGroupsContainer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infGroups: {
    width: '50%',
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  infTitleGroup: {
    color: '#fff',
    fontSize: 13
  },
  graphiContainer: {
    width: '45%',
    alignItems: "center",
    justifyContent: "center"
  },
  graphiTextInf: {
    color: Colors.primary100,
    paddingVertical: 5,
    fontSize: 11
  }
});
