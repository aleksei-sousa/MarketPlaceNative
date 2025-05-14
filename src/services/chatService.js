import * as SecureStore from "expo-secure-store";
import api from "./api";

const chatService = {
  getChats: async () => {
    const token = await SecureStore.getItemAsync("onebitshop-token");

    const res = await api.get("/conversations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  },

  /**
   * @param {{ product: string, seller: string, initialMessage: string }} params
   */
  startChat: async (params) => {
    const token = await SecureStore.getItemAsync("onebitshop-token");

    const res = await api.post("/conversations", params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  },

  /**
   * @param {{ _id: string, content: string, receiver: string, sender: string }} params
   */
  sendMessage: async (params) => {
    const token = await SecureStore.getItemAsync("onebitshop-token");

    const res = await api.post(`/conversations/${params._id}/send`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  },
};

export default chatService;
