import React, {
  useLayoutEffect,
  useContext,
  useCallback,
  useState,
  useEffect
} from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../store/groups-context";
import IconButton from "../components/ui/IconButton";
import { Feather, Ionicons } from "@expo/vector-icons";
import { auth } from "../util/auth";
import { getFormattedDate } from "../util/date";
import {
  getUserIdByEmail,
  updateObjectiveStatus,
  updateTaskStatus,
  getEmailByUsername
} from "../util/firestore";
import Error from "../components/ui/Error";

function TaskScreen({ route, navigation, user }) {

  const [error, setError] = useState();
  const currentUser = auth.currentUser.uid;
  const groupsCtx = useContext(GroupsContext);
  const taskId = route.params?.taskId;
  const groupId = route.params?.groupId;
  const [taskCompleted, setTaskCompleted] = useState('');
  
  let selectTask = null;
  let foundMember = null;
  
  if (groupsCtx.groups) {
    groupsCtx.groups?.forEach((group) => {
      group.members?.forEach((member) => {
        if (member.user === currentUser) {
          foundMember = member;
        }
      });
    });
  }

  if (groupsCtx.groups) {
    groupsCtx.groups?.forEach((group) => {
      group.tasks?.forEach((task) => {
        if (task.id === taskId) {
          selectTask = task;
        }
      });
    });
  }

  const isAdmin = foundMember && foundMember.admin === true;
  const userId = user?._key?.path?.segments[user._key.path.segments.length - 1];
  const isCurrentUser = currentUser === userId;

  useEffect(() => {
    if (!selectTask) {
      navigation.navigate("GroupScreen", {
        groupId: groupId,
      });
      Alert.alert("Task Deleted", "This task no longer exists");
    }
  }, [navigation, selectTask]);

  const renderHeaderButtons = useCallback(() => {
    return (
      <View style={{ flexDirection: "row" }}>
        {selectTask.owner.id === currentUser && (
          <IconButton
            icon={"create-outline"}
            color={Colors.primary100}
            size={24}
            onPress={() => {
              navigation.navigate("ManageTasksScreen", {
                editedTaskId: taskId,
                groupId: selectTask.group,
              });
            }}
          />
        )}
      </View>
    );
  }, [navigation, taskId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectTask?.title + ' - ' + (taskCompleted ? 'completed' : 'ongoing') || 'Task',
      headerRight: renderHeaderButtons,
    });
  }, [navigation, selectTask, renderHeaderButtons, taskCompleted]);

  async function onChangeCompletedStatusHandler(objectiveId) {
    try {
      const email = await getEmailByUsername(selectTask.designatedUser)
      const designatedUser = await getUserIdByEmail(email);
      if (designatedUser === currentUser) {
        groupsCtx.updateObjectiveStatus(selectTask.group, taskId, objectiveId);
        await updateObjectiveStatus(taskId, objectiveId);
      } else {
        Alert.alert(
          "Access Denied",
          "This Task was not assigned to you.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } catch {
      setError("Could not update objective status - please try again later");
    }
  }

  async function onChangeTaskCompletedStatusHandler(taskId) {
    try {
      // Atualizar o status da tarefa
      await updateTaskStatus(taskId);
  
      // Verificar se todas as metas da tarefa estão concluídas
      const allObjectivesCompleted = selectTask?.objectives.every(objective => objective.completed);
  
      // Atualizar o estado da tarefa concluída
      setTaskCompleted(allObjectivesCompleted);
    } catch {
      setError("Could not update task status - please try again later");
    }
  }

  if (error && !isLoading) {
    return <Error message={error} />;
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.dateContainer}>
          <View style={styles.designatedUserContainer}>
            <View style={styles.dateContent}>
              <Ionicons name='calendar-outline' size={13} color={Colors.primary100} />
              <Text style={styles.dateText}>  Deadline: </Text>
              <Text style={styles.date}> {getFormattedDate(selectTask?.date)}</Text>
            </View>
            <View style={styles.dateContent}>
              <Ionicons name='person-outline' size={13} color={Colors.primary100} />
              <Text style={styles.designatedUserText}>  Desinated: </Text>
              <Text style={styles.designatedUser} numberOfLines={1} ellipsizeMode="tail"> {selectTask?.designatedUser}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Image source={require('../assets/images/team.png')} style={styles.imgBanner}/>
          </View>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.titleContent}>
          <Ionicons name="document-text-outline" color={Colors.primary900} size={16} />
          <Text style={styles.title}>Description</Text>
        </View>
        <View style={styles.descriptionContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.description}>{selectTask?.description}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.objectivesContainer}>
        <View style={styles.titleContent}>
          <Feather name="target" color={Colors.primary900} size={15}/>
          <Text style={styles.title}>Objectives</Text>
        </View>
        <View style={styles.objectivesScrollContainer}>
          {selectTask?.objectives.map((objective, index) => (
            <ScrollView key={index} contentContainerStyle={styles.objectivesInnerContainer} showsVerticalScrollIndicator={false}>
              {objective?.completed ? (
                <IconButton
                  onPress={() => onChangeCompletedStatusHandler(objective?.id)}
                  icon={"checkmark-circle-outline"}
                  color={Colors.primary100}
                  size={32}
                />
              ) : (
                <IconButton
                  onPress={() => onChangeCompletedStatusHandler(objective?.id)}
                  icon={"ellipse-outline"}
                  color={Colors.primary100}
                  size={32}
                />
              )}
              <Text style={styles.objectives}> {objective.value}</Text>
            </ScrollView>
          ))}
        </View>
      </View>
    </View>
  );
}

export default TaskScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.primary100,
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.primary100,
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
  },
  dateText: {
    fontSize: 16,
    color: Colors.primary100,
    fontWeight: "bold"
  },
  date: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.primary100,
  },
  buttonContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
  imgBanner: {
    width: 120,
    height: 130
  },
  designatedUserText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary100,
  },
  designatedUser: {
    fontSize: 16,
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
    color: Colors.primary900
  },
  descriptionContent: {
    flex: 1,
    width: '90%',
    backgroundColor: Colors.primary900,
    borderWidth: 2,
    borderColor: Colors.primary500,
    borderRadius: 12,
    elevation: 3,
    shadowColor: Colors.primary100,
    shadowRadius: 4,
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
    width: '100%',
    alignItems: "center"
  },
  objectivesScrollContainer: {
    width: '90%'
  },
  objectivesInnerContainer: {
    backgroundColor: Colors.primary900,
    alignItems: "center",
    flexDirection: "row",
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.primary100,
    borderRadius: 12,
    elevation: 3,
    shadowColor: Colors.primary100,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  objectives: {
    color: Colors.primary100,
    fontSize: 16,
    textAlign: "left",
    flexShrink: 1,
  },
});