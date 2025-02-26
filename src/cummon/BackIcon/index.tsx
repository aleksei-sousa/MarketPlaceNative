import React from "react";
import { router } from "expo-router";
//import { PropsStack } from "../../../routes";
import { Back, BackContainer } from "./styled.js";

const back = require("@/assets/icons/arrow-left.png");

// type props = {
//   marginLeft: number;
// };

// const BackIcon = ({ marginLeft }) => {
  const BackIcon = () => {
  //const navigation = useNavigation<PropsStack>();

  return (
    <BackContainer
      onPress={() => {
        router.back()
      }}
    >
      {/* <Back source={back} /> */}
    </BackContainer>
  );
};

export default BackIcon;
