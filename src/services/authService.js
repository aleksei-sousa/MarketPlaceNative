import api from "./api";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authService = {
  register: async (params) => {
    console.log('authService ok', params)
    const res = await api.post("/register", params);
    //console.log(res)
    return res;
  },

  login: async (params) => {
    const res = await api.post("/login", params);

    if (res.status === 400 || res.status === 401) {
      Alert.alert("Email ou senha incorretos");
    } else {
      await SecureStore.setItemAsync("onebitshop-token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
    }

    return res;
  },
};

export default authService;
