import React from "react";
import { ButtonContainer, ButtonText } from "./styled";

const DefaultButton = ({ buttonText, buttonType, marginVertical, buttonHandle }) => {
  return (
    <ButtonContainer
      type={buttonType}
      marginVertical={marginVertical}
      onPress={buttonHandle}
    >
      <ButtonText>{buttonText}</ButtonText>
    </ButtonContainer>
  );
};

export default DefaultButton;
