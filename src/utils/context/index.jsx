// Permet de dispatcher les useState venant de l'API dans
// l'ensemble des éléments.
// ApiContext.js
import React, { createContext, useContext, useReducer } from 'react';

//  state Initial 
const initialState = {
  loading: false,
  error: null,
  data: null,
};

// Actions
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const SET_DATA = 'SET_DATA';

// Reducer function
const apiReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

// Create context
const ApiContext = createContext();

// Context provider component
export const ApiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  // Actions
  const setLoading = (loading) => {
    dispatch({ type: SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: SET_ERROR, payload: error });
  };

  const setData = (data) => {
    dispatch({ type: SET_DATA, payload: data });
  };

  return (
    <ApiContext.Provider
      value={{
        state,
        setLoading,
        setError,
        setData,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = () => useContext(ApiContext);
