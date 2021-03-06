import React from 'react';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

var ID = function() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

const items = [
  { _id: `${ID()}`, text: 'a single todo item', completed: false },
  { _id: `${ID()}`, text: 'a single todo item_2', completed: false },
  { _id: `${ID()}`, text: 'a single todo item_3', completed: true },
  { _id: `${ID()}`, text: 'a single todo item_4', completed: true },
  { _id: `${ID()}`, text: 'a single todo item_5', completed: false },
];

const ActionReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return { ...state, items: [...state.items, action.payload] };
    case 'COMPLETED':
      return {
        ...state,
        items: [
          ...state.items.map(todo =>
            todo._id === action.payload._id
              ? { ...todo, completed: !todo.completed }
              : todo,
          ),
        ],
      };
    case 'UPDATE':
      console.log('UPDATE');
      return state;
    case 'DELETE':
      return {
        ...state,
        items: [
          ...state.items.filter(todo =>
            todo._id !== action.payload._id ? { ...todo } : null,
          ),
        ],
      };
    default:
      return state;
  }
};

function ActionProvider({ children }) {
  const [state, dispatch] = React.useReducer(ActionReducer, {
    items: items,
  });

  return (
    <>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </DispatchContext.Provider>
    </>
  );
}
export { ActionProvider, StateContext, DispatchContext, ActionReducer };
