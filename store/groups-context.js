import { createContext, useReducer } from "react";

export const GroupsContext = createContext({
  groups: [],
  addGroup: ({ title, members }) => {},
  setGroups: (groups) => {},
  deleteGroup: (id) => {},
  updateGroup: (id, { title, members }) => {},
});

function groupsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { ...action.payload }];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableGroupIndex = state.findIndex(
        (group) => group.id === action.payload.id
      );
      const updatableGroup = state[updatableGroupIndex];
      const updatedItem = { ...updatableGroup, ...action.payload.data };
      const updatedGroups = [...state];
      updatedGroups[updatableGroupIndex] = updatedItem;
      return updatedGroups;
    case "DELETE":
      return state.filter((group) => group.id !== action.payload);
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

  const value = {
    groups: groupsState,
    addGroup: addGroup,
    setGroups: setGroups,
    deleteGroup: deleteGroup,
    updateGroup: updateGroup,
  };

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
}

export default GroupsContextProvider;
