import { createContext, useReducer } from "react";

export const GroupsContext = createContext({
  groups: [],
  addGroup: ({ title }) => { },
  setGroups: (groups) => { },
  deleteGroup: (id) => { },
  updateGroup: (id, { title }) => { },
  setMembers: (groupId, members) => { },
  deleteMember: (id) => { },
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
            )
          };
        }
        return group;
      });
    case "DELETE_MEMBER":
      return state.map(group => {
        if (group.id === action.payload.groupId) {
          return {
            ...group,
            members: group.members.filter(member => member.id !== action.payload.memberId),
          };
        }
        return group;
      });
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
  function deleteMember(groupId, memberId) {
    dispatch({ type: "DELETE_MEMBER", payload: { groupId, memberId } });
  }

  const value = {
    groups: groupsState,
    addGroup: addGroup,
    setGroups: setGroups,
    deleteGroup: deleteGroup,
    updateGroup: updateGroup,
    setMembers: setMembers,
    deleteMember: deleteMember,
  };

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
}

export default GroupsContextProvider;
