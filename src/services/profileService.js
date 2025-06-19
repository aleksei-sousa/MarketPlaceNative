import api from "./api";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAuthHeaders = async () => {
  const token = await SecureStore.getItemAsync("onebitshop-token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

const profileService = {
  getUserProfile: async () => {
    const user = await AsyncStorage.getItem("user");
    console.log(user)
    const parsedUser = JSON.parse(user || "{}");

    const headers = await getAuthHeaders();
    const res = await api.get(`/users/${parsedUser._id}`, { headers });
    console.log(res)
    return res;
  },

  updateUserProfile: async (params) => {
    const headers = await getAuthHeaders();
    const res = await api.put("/profile", params, { headers });

    return res;
  },

  getSellerProfile: async ({ sellerId }) => {
    const headers = await getAuthHeaders();
    const res = await api.get(`/users/${sellerId}`, { headers });

    return res;
  },
};

export default profileService;
