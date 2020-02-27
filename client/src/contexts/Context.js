import React from 'react';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

const ActionReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      console.log('CREATE');
      return state;
    case 'READ ':
      console.log('READ');
      return state;
    case 'UPDATE':
      console.log('UPDATE');
      return state;
    case 'DELETE':
      console.log('DELETE');
      return state;
    default:
      return state;
  }
};

function ActionProvider({ children }) {
  const [state, dispatch] = React.useReducer(ActionReducer, {
    action: '0',
  });

  return (
    <>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          {children}
        </StateContext.Provider>
      </DispatchContext.Provider>
    </>
  );
}
export { ActionProvider, StateContext, DispatchContext };
