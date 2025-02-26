import React, { createContext, useReducer, useEffect } from "react";
import authService from "../services/authService.js";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

const initialState = {
  user: null,
  token: null,
  isLoading: true, // Iniciamos carregando o estado da autenticação
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

  // 🔹 Restaurar Token ao iniciar o app
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("onebitshop-token");
        const userJson = await AsyncStorage.getItem("user");
        const user = userJson ? JSON.parse(userJson) : null;

        if (token && user) {
          dispatch({ type: "RESTORE_TOKEN", user, token });
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
      } catch (error) {
        console.error("Erro ao restaurar sessão:", error);
      }
    };

    loadStoredAuth();
  }, []);

  // 🔹 Função de Registro
  const register = async (name, email, password, phone) => {
    try {
      await authService.register({ name, email, password, phone });
      console.log('auth ok')
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  };

  // 🔹 Função de Login
  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });

      if (response.status === 200) {
        const { user, token } = response.data;

        await SecureStore.setItemAsync("onebitshop-token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));

        dispatch({ type: "SIGN_IN", user, token });
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  // 🔹 Função de Logout
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
