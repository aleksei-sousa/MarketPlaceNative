import api from "./api";
import * as SecureStore from "expo-secure-store";

const addressService = {
  addAddress: async (params) => {
    const token = await SecureStore.getItemAsync("onebitshop-token");
    const res = await api.post("/addresses", params, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  },

  getAddress: async () => {
    const token = await SecureStore.getItemAsync("onebitshop-token");
    const res = await api.get("/addresses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  },

  deleteAddress: async (_id) => {
    const token = await SecureStore.getItemAsync("onebitshop-token");
    const res = await api.delete(`/addresses/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  },
};

export default addressService;
