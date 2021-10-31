import React from "react";
import { createContext, useContext, useReducer } from "react";

export const Context = createContext(null);

export const GlobalState = ({ reducer, initialState, children }) => {
    return (
        <Context.Provider value={useReducer(reducer, initialState)}>
            {children}
        </Context.Provider>
    )
}

export const useGlobalState = () => useContext(Context);