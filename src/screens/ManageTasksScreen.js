import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView } from "react-native";
import { useLayoutEffect, useContext, useState, useEffect } from "react";
import TaskForm from "../components/ManageTask/TaskForm";
import { Colors } from "../constants/styles";
import { GroupsContext } from "../Context/groups-context";
import Error from "../components/ui/Error";
import Loading from "../components/ui/LoadingOverlay";
import {
  createtask,
  updateTask,
  deleteTask,
} from "../util/firebase/firestore/tasks";
import { getUserIdByEmail } from "../util/firebase/firestore/user";
import { isMember } from "../util/firebase/firestore/groups";
import { generateUniqueId } from "../util/generateUniqueId";
import TranslatedText from "../Context/language-context";
import { useTheme } from "@react-navigation/native";

function ManageTasksScreen({ navigation, route }) {
  const groupsCtx = useContext(GroupsContext);   
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { language } = useTheme();

  const isEditing = !editedTaskId;
  const editedTaskId = route.params?.editedTaskId;
  const groupId = route.params?.groupId;
  const previous = route.params?.previous;
  
  const emailNotFoundText = language === 'en' ? 'Not Found' : 'Não encontrado';
  const emailNotFoundSubText = language === 'en' ? 
    'No user found with the specified email.' : 
    'Nenhum usuário encontrado com o e-mail especificado.'
  ;
  const userNotFoundText = language === 'en' ? 'User not a Member' : 'Usuário não é membro';
  const userNotFoundSubText = language === 'en' ? 
    'This user is not a member of the group.' : 
    'Este usuário não é membro do grupo.'
  ;

  let selectTask = null;

  if (groupsCtx.groups) {
    groupsCtx.groups?.forEach((group) => {
      group.tasks?.forEach((task) => {
        if (task.id === editedTaskId) {
          selectTask = task;
        }
      });
    });
  }

  function cancelHandler() {
    console.log(groupId);
    navigation.goBack();
  }

  async function deleteGroupHandler() {
    setIsLoading(true);
    try {
      await deleteTask(editedTaskId);
      groupsCtx.deleteTask(groupId, editedTaskId);
      navigation.navigate(previous, {
        groupId: groupId,
      });
    } catch (error) {
      setError("Could not delete group - please try again later");
      setIsLoading(false);
    }
  }

  async function confirmHandler(taskData) {
    setIsLoading(true);
    try {
      const userId = await getUserIdByEmail(taskData.designatedUser);
      // const isMember = selectGroup?.members.some(
      //   (member) => member.user.id === userId
      // );

      if (!userId) {
        Alert.alert(emailNotFoundText, emailNotFoundSubText);
        return;
      }
      const checkMembership = await isMember(groupId, userId);
      if (!checkMembership) {
        Alert.alert(
          userNotFoundText,
          userNotFoundSubText
        );
        return;
      }

      let updatedTaskData = { ...taskData, designatedUser: userId };
      if (isEditing) {
        console.log(updatedTaskData);
        groupsCtx.updateTask(groupId, editedTaskId, updatedTaskData);
        await updateTask(editedTaskId, updatedTaskData);
      } else {
        updatedTaskData = {
          ...taskData,
          designatedUser: userId,
          completed: false,
        };
        const taskId = generateUniqueId();
        groupsCtx.addTask({ ...taskData, id: taskId, group: groupId });
        await createtask(groupId, updatedTaskData, taskId);
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setError("Could not save data - please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editedTaskId ? "Update Task" : "Add Task ",
    });
  }, [isEditing]);

  if (error && !isLoading) {
    return <Error message={error} />;
  }
  if (isLoading) {
    return <Loading style={{ backgroundColor: Colors.primary800 }} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={isEditing ? -100 : -100}
      >
        <View style={styles.container}>
          <TaskForm
            onCancel={cancelHandler}
            submitButtonLabel={isEditing ? <TranslatedText enText={'Update task'} ptText={'Atualizar tarefa'} /> : <TranslatedText enText={'Add task'} ptText={'Add tarefa'} />}
            onSubmit={confirmHandler}
            defaultValues={selectTask}
            pageTitle={editedTaskId ? <TranslatedText enText={'Update task'} ptText={'Atualizar tarefa'} /> : <TranslatedText enText={'Add task'} ptText={'Adicionar tarefa'} />}
            isEditing={isEditing}
            onPressDelete={deleteGroupHandler}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default ManageTasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary1000,
    alignItems: "center",
  },
});
