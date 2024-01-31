import { createContext, useReducer } from "react";

export const GroupsContext = createContext({
  groups: [],
  addGroup: ({ title }) => {},
  setGroups: (groups) => {},
  deleteGroup: (id) => {},
  updateGroup: (id, { title }) => {},
  setMembers: (groupId, members) => {},
  addMember: ({ admin, group, user }) => {},
  deleteMember: (id) => {},
  updateAdmin: (id) => {},
  addTask: (taskData) => {},
  setTasks: (groupId, tasks) => {},
  updateTask: (groupId, taskId, newTaskData) => {},
});

function groupsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { ...action.payload }].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    case "SET":
      // Sort groups by name in ascending order
      const sortedGroups = [...action.payload].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      return sortedGroups;
    case "UPDATE":
      const updatableGroupIndex = state.findIndex(
        (group) => group.id === action.payload.id
      );
      const updatableGroup = state[updatableGroupIndex];
      const updatedItem = { ...updatableGroup, ...action.payload.data };
      const updatedGroups = [...state];
      updatedGroups[updatableGroupIndex] = updatedItem;
      // Ensure the updated list is also sorted
      return updatedGroups.sort((a, b) => a.title.localeCompare(b.title));
    case "DELETE":
      return state.filter((group) => group.id !== action.payload);
    case "SET_MEMBERS":
      return state.map((group) => {
        if (group.id === action.payload.groupId) {
          return {
            ...group,
            members: [...action.payload.members].sort((a, b) =>
              a.username.localeCompare(b.username)
            ),
          };
        }
        return group;
      });
    case "ADD_MEMBER":
      return state.map((group) => {
        if (group.id === action.payload.groupId) {
          const newMember = action.payload.member;
          return {
            ...group,
            members: [...group.members, newMember].sort((a, b) =>
              a.username.localeCompare(b.username)
            ),
          };
        }
        return group;
      });
    case "DELETE_MEMBER":
      return state.map((group) => {
        if (group.id === action.payload.groupId) {
          return {
            ...group,
            members: group.members.filter(
              (member) => member.id !== action.payload.memberId
            ),
          };
        }
        return group;
      });
    case "UPDATE_ADMIN":
      return state.map((group) => {
        if (group.id === action.payload.groupId) {
          const members = Array.isArray(group.members) ? group.members : [];
          return {
            ...group,
            members: members.map((member) => {
              if (member.id === action.payload.memberId) {
                return { ...member, admin: !member.admin };
              }
              return member;
            }),
          };
        }
        return group;
      });
    case "ADD_TASK":
      return state.map((group) => {
        if (group.id === action.payload.groupId) {
          const newTasks = action.payload.task;
          return {
            ...group,
            tasks: [...group.tasks, newTasks].sort((a, b) =>
              a.title.localeCompare(b.title)
            ),
          };
        }
        return group;
      });
    case "SET_TASKS":
      return state.map((group) => {
        if (group.id === action.payload.groupId) {
          const sortedTasks = action.payload.tasks.map((task) => ({
            ...task,
            objectives: task.objectives.sort((a, b) =>
              a.value.localeCompare(b.value)
            ),
          }));
          return {
            ...group,
            tasks: sortedTasks.sort((a, b) => a.title.localeCompare(b.title)),
          };
        }
        return group;
      });

    case "UPDATE_TASK":
      console.log(
        "Current state before update:",
        JSON.stringify(state, null, 2)
      );
      const newState = state.map((group) => {
        if (group.id === action.payload.groupId) {
          return {
            ...group,
            tasks: group.tasks
              .map((task) => {
                if (task.id === action.payload.taskId) {
                  return { ...task, ...action.payload.newTaskData };
                }
                return task;
              })
              .sort((a, b) => a.title.localeCompare(b.title)),
          };
        }
        return group;
      });
      console.log("New state after update:", JSON.stringify(newState, null, 2));
      return newState;
    default:
      return state;
  }
}

function GroupsContextProvider({ children }) {
  const [groupsState, dispatch] = useReducer(groupsReducer, []);

  function addGroup(groupData) {
    dispatch({ type: "ADD", payload: groupData });
  }

  function setGroups(groups) {
    dispatch({ type: "SET", payload: groups });
  }

  function deleteGroup(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateGroup(id, groupData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: groupData } });
  }

  function setMembers(groupId, members) {
    dispatch({ type: "SET_MEMBERS", payload: { groupId, members } });
  }
  function addMember(memberData) {
    dispatch({ type: "ADD_MEMBER", payload: memberData });
  }
  function deleteMember(groupId, memberId) {
    dispatch({ type: "DELETE_MEMBER", payload: { groupId, memberId } });
  }
  function updateAdmin(groupId, memberId) {
    dispatch({ type: "UPDATE_ADMIN", payload: { groupId, memberId } });
  }
  function addTask(taskData) {
    dispatch({ type: "ADD_TASK", payload: taskData });
  }
  function setTasks(groupId, tasks) {
    dispatch({ type: "SET_TASKS", payload: { groupId, tasks } });
  }
  function updateTask(groupId, taskId, newTaskData) {
    dispatch({
      type: "UPDATE_TASK",
      payload: { groupId, taskId, newTaskData },
    });
  }

  const value = {
    groups: groupsState,
    addGroup: addGroup,
    setGroups: setGroups,
    deleteGroup: deleteGroup,
    updateGroup: updateGroup,
    setMembers: setMembers,
    addMember: addMember,
    deleteMember: deleteMember,
    updateAdmin: updateAdmin,
    addTask: addTask,
    setTasks: setTasks,
    updateTask: updateTask,
  };

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
}

export default GroupsContextProvider;
