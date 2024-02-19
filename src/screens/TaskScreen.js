import React, {
  useLayoutEffect,
  useContext,
  useCallback,
  useState,
  useEffect
} from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../Context/groups-context";
import IconButton from "../components/ui/IconButton";
import { Feather, Ionicons } from "@expo/vector-icons";
import { auth } from "../util/firebase/auth";
import { getFormattedDate } from "../util/date";
import {
  updateObjectiveStatus,
  updateTaskStatus,
} from "../util/firebase/firestore/tasks";
import {
  getEmailByUsername,
  getUserIdByEmail,
} from "../util/firebase/firestore/user";
import Error from "../components/ui/Error";
import { useTheme } from "../Context/theme-context";
import TranslatedText from "../Context/language-context";

function TaskScreen({ route, navigation, user }) {

  const { colors, language } = useTheme();

  const [error, setError] = useState();
  const currentUser = auth.currentUser.uid;
  const groupsCtx = useContext(GroupsContext);
  const taskId = route.params?.taskId;
  const groupId = route.params?.groupId;
  const currentGroup = groupsCtx.groups?.find(group => group.id === groupId);
  const previous = route.params?.previous;

  const statusConclutedTasks = language === 'en' ? 'Completed' : 'Concluída';
  const statusOngoingTasks = language === 'en' ? 'Ongoing' : 'Em andamento';
  const alertConclutedTask = language === 'en' ? 'Some objectives have not yet been completed.' : 'Alguns objetivos ainda não foram concluídos.';
  const alertConclutedObjectives = language === 'en' ? "This Task was not assigned to you." : 'Esta tarefa não foi atribuída a você.';
  const deleteTasktext = language === 'en' ? "Task Deleted!" : "Tarefa Deletada!";
  const deleteTaskSubText = language === 'en' ? "This task no longer exists." : "Esta tarefa não existe mais.";
  const alertObjectivesStatus = language === 'en' ?
    "You can't change the status of objectives for a completed task." :
    'Você não pode alterar o status dos objetivos de uma tarefa concluída.'
    ;

  let selectTask = null;
  let foundMember = null;

  if (groupsCtx.groups) {
    groupsCtx.groups?.forEach((group) => {
      group.tasks?.forEach((task) => {
        if (task.id === taskId) {
          selectTask = task;
        }
      });
    });
  }

  if (currentGroup) {
    currentGroup.members?.forEach((member) => {
      if (member.user === currentUser) {
        console.log(member)
        foundMember = member;
      }
    });
  }

  const isAdmin = foundMember && foundMember.admin === true;

  useEffect(() => {
    if (!selectTask) {
      navigation.navigate(previous, {
        groupId: groupId,
      });
      Alert.alert(deleteTasktext, deleteTaskSubText);
    }
  }, [navigation, selectTask]);

  const renderHeaderButtons = useCallback(() => {
    return (
      <View style={{ flexDirection: "row" }}>
        {(isAdmin || selectTask.owner.id === currentUser) && (
          <>
            <IconButton
              icon={"create-outline"}
              color={Colors.primary100}
              size={24}
              onPress={() => {
                navigation.navigate("ManageTasksScreen", {
                  previous: previous,
                  editedTaskId: taskId,
                  groupId: groupId || selectTask.group,
                });
              }}
            />
            <IconButton
              icon={"checkmark-circle-outline"}
              color={Colors.primary100}
              size={24}
              onPress={() => onChangeTaskCompletedStatusHandler()}
            />
          </>
        )}
      </View>
    );
  }, [navigation, taskId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        selectTask?.title,
      headerRight: renderHeaderButtons,
    });
  }, [navigation, selectTask, renderHeaderButtons]);

  async function onChangeCompletedStatusHandler(objectiveId) {
    try {
      if (selectTask.completed) {
        // Se a tarefa estiver concluída, não permita a alteração do status do objetivo
        Alert.alert(
          "Ops!",
          alertObjectivesStatus,
          [{ text: "OK" }],
          { cancelable: false }
        );
        return;
      }

      const email = await getEmailByUsername(selectTask.designatedUser);
      const designatedUser = await getUserIdByEmail(email);
      if (designatedUser === currentUser) {
        groupsCtx.updateObjectiveStatus(
          selectTask.group.id,
          taskId,
          objectiveId
        );
        await updateObjectiveStatus(taskId, objectiveId);
      } else {
        Alert.alert(
          "Ops!",
          alertConclutedObjectives,
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    } catch {
      setError("Could not update objective status - please try again later");
    }
  }

  async function onChangeTaskCompletedStatusHandler() {
    try {
      // Verifica se todos os objetivos estão concluídos
      const allObjectivesCompleted = selectTask.objectives.every(objective => objective.completed);
      if (allObjectivesCompleted) {
        // Atualiza o status da tarefa no contexto de grupos
        groupsCtx.updateTaskStatus(selectTask.group, taskId);
        // Atualiza o status da tarefa
        await updateTaskStatus(taskId);
      } else {
        // Se algum objetivo não estiver concluído, você pode exibir um alerta ou lidar com isso de acordo com sua lógica
        Alert.alert(
          'Ops!',
          alertConclutedTask,
          [{ text: "OK" }],
          { cancelable: false }
        );
      }

      if (error && !isLoading) {
        return <Error message={error} />;
      }
    } catch (error) {
      setError("Could not update task status - please try again later");
    }
  }

  return (
    <View style={[styles.rootContainer, { backgroundColor: colors.background50 }]}>
      <View style={[styles.infoContainer, { backgroundColor: colors.background50 }]}>
        <View style={styles.dateContainer}>
          <View style={styles.designatedUserContainer}>
            <View style={styles.dateContent}>
              <Ionicons name='person-outline' size={13} color={Colors.primary100} />
              <TranslatedText enText={'Desinated:'} ptText={'Designado:'} style={styles.designatedUserText} />
              <Text style={styles.designatedUser} numberOfLines={1} ellipsizeMode="tail">{selectTask?.designatedUser || <TranslatedText enText={'Non existing user'} ptText={'Usuário não existente'} />}</Text>
            </View>
            <View style={styles.dateContent}>
              <Ionicons name={selectTask?.completed ? 'checkmark-outline' : 'reload-outline'} size={13} color={Colors.primary100} />
              <TranslatedText enText={'Task status :'} ptText={'Status da tarefa:'} style={styles.designatedUserText} />
              <Text style={styles.designatedUser} numberOfLines={1} ellipsizeMode="tail">{selectTask?.completed ? statusConclutedTasks : statusOngoingTasks}</Text>
            </View>
            <View style={styles.dateContent}>
              <Ionicons name='calendar-outline' size={13} color={Colors.primary100} />
              <TranslatedText enText={'Deadline:'} ptText={'Prazo final:'} style={styles.designatedUserText} />
              <Text style={styles.date}>{selectTask?.date ? getFormattedDate(selectTask?.date) : "No Date"}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Image source={require('../../assets/images/team.png')} style={styles.imgBanner} />
          </View>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.titleContent}>
          <Ionicons name="document-text-outline" color={colors.text900} size={16} />
          <TranslatedText enText={'Description'} ptText={'Descrição'} style={[styles.title, { color: colors.text900 }]} />
        </View>
        <View style={[styles.descriptionContent, { backgroundColor: colors.background900 }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.description}>{selectTask?.description}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.objectivesContainer}>
        <View style={styles.titleContent}>
          <Feather name="target" color={colors.text900} size={15} />
          <TranslatedText enText={'Objectives'} ptText={'Objetivos'} style={[styles.title, { color: colors.text900 }]} />
        </View>
        <ScrollView contentContainerStyle={styles.objectivesScrollContainer} showsVerticalScrollIndicator={false}>
          {selectTask?.objectives.map((objective, index) => (
            <View key={index} style={[styles.objectivesInnerContainer, { backgroundColor: colors.background900 }]}>
              {objective?.completed ? (
                <IconButton
                  onPress={() => onChangeCompletedStatusHandler(objective?.id)}
                  icon={"checkmark-circle-outline"}
                  color={colors.icons400}
                  size={32}
                />
              ) : (
                <IconButton
                  onPress={() => onChangeCompletedStatusHandler(objective?.id)}
                  icon={"ellipse-outline"}
                  color={colors.icons400}
                  size={32}
                />
              )}
              <Text style={[styles.objectives, { color: colors.text700 }]}> {objective.value}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default TaskScreen;

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: "row",
    paddingBottom: 16,
    alignItems: "flex-start",
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary900,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  designatedUserContainer: {
    paddingHorizontal: 20,
    flex: 3,
    alignItems: "flex-start",
  },
  dateContent: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.primary100,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 3,
    gap: 8
  },
  dateText: {
    fontSize: 14,
    color: Colors.primary100,
    fontWeight: "bold"
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.primary100,
  },
  buttonContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
  imgBanner: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  designatedUserText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary100,
  },
  designatedUser: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.primary100,
    width: '60%',
  },
  descriptionContainer: {
    flex: 2,
    width: '100%',
    alignItems: "center"
  },
  titleContent: {
    flexDirection: "row",
    padding: 20,
    width: '100%',
    gap: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  descriptionContent: {
    flex: 1,
    width: '90%',
    borderWidth: 2,
    borderColor: Colors.primary500,
    borderRadius: 12,
    elevation: 3,
    shadowColor: Colors.primary900,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  description: {
    fontSize: 15,
    flex: 1,
    padding: 8,
    color: Colors.primary100,
    justifyContent: "center",
    textAlign: "justify",
  },
  objectivesContainer: {
    flex: 3,
    alignItems: "center",
    width: '100%',
    marginBottom: 25
  },
  objectivesScrollContainer: {
    alignItems: "center",
    justifyContent: 'flex-start',
    paddingBottom: 20,
    gap: 10
  },
  objectivesInnerContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    width: 350,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: Colors.primary500,
    borderRadius: 12,
    elevation: 3,
    shadowColor: Colors.primary900,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  objectives: {
    fontSize: 14,
  },
});