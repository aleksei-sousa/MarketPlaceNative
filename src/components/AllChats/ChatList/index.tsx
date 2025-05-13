import React, { useState } from "react";
import { NoChat } from "./styled";
import { FlatList } from "react-native";
import ChatCard from "./ChatCard/index";
import chatService from "@/src/services/chatService";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "@/src/components/common/Loader";

const ChatList = () => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);

  const renderItem = ({ item }) => {
    return <ChatCard data={item} />;
  };

  const handleGetChats = async () => {
    const res = await chatService.getChats();
    setChats(res.data);
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetChats();
    }, [])
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {chats.length <= 0 ? (
        <NoChat>Você não tem chats no momento!</NoChat>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </>
  );
};

export default ChatList;
