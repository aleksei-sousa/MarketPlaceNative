import React from "react";
import { Container, EmptyView, Title } from "./styled";
import BackIcon from "../BackIcon";

const DefaultTitle = ({ fontSize, title }) => {
  return (
    <Container>
      <BackIcon marginLeft={0} />
      <Title fontSize={fontSize}>{title}</Title>
      <EmptyView />
    </Container>
  );
};

export default DefaultTitle;
