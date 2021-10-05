import React, { createContext, useContext, useReducer } from "react";

//creating a store or context to push the state in it to avoid prop drilling
export const userContext = createContext();

//wraps up the whole application to provide the props state at any components

//reducer and initialstate we have used is to change the state like we need to get
//token after person logins and remove the token after person logsout
//checkout the Reducer.js file to understand
export const StateProvider = ({ initialState, reducer, children }) => {
  return (
    <userContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </userContext.Provider>
  );
};

//this function allows to pull the state from the store that is userContext in this case
//and can be used inside any components to get the data ,for us we need role and token
export const GetUserContext = () => useContext(userContext);
