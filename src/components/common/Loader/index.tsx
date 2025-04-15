import React from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "./styled.js";

const Loader = () => {
  return (
    <Container>
      <ActivityIndicator size="large" />
    </Container>
  );
};

export default Loader;
