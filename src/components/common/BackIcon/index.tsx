import React from "react";
import { router } from "expo-router";
import { Back, BackContainer } from "./styled";

const back = require("@/assets/icons/arrow-left.png");

const BackIcon = ({ marginLeft = 0 }) => {
  return (
    <BackContainer onPress={() => router.back()}>
      <Back source={back} marginLeft={marginLeft} />
    </BackContainer>
  );
};

export default BackIcon;
