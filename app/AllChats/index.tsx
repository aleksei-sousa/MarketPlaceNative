import React from "react";
import { Container } from "@/src/Styles/AllChats.styled";
import DefaultTitle from "@/src/components/common/DefaultTitle";
import NavBar from "../../src/components/common/NavBar";
import ChatList from "@/src/components/AllChats/ChatList";

const AllChats = () => {
  return (
    <>
      <Container>
        <DefaultTitle title="CONVERSAS" fontSize={20} />

        <ChatList />
      </Container>
      <NavBar />
    </>
  );
};

export default AllChats;
