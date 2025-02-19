import React, { createContext, useReducer } from "react";
import authService from "../services/authService.js";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isSignout: false,
};

function authReducer(prevState, action) {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        user: action.user,
        token: action.token,
        isLoading: false,
      };

    case "SIGN_IN":
      return {
        ...prevState,
        user: action.user,
        token: action.token,
        isSignout: false,
      };

    case "SIGN_OUT":
      return {
        ...prevState,
        user: null,
        token: null,
        isSignout: true,
      };

    default:
      return prevState;
  }
}

export function AuthContextProvider({ children }) {
  
  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = async (name, email, password, phone) => {
    try {
      await authService.register({ name, email, password, phone });
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });

      if (response.status === 200) {
        dispatch({ type: "SIGN_IN", user: response.data.user, token: response.data.token });
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("onebitshop-token");
      await AsyncStorage.removeItem("user");
      dispatch({ type: "SIGN_OUT" });
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
