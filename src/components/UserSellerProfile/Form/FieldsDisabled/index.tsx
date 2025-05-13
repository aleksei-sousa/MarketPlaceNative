import React from "react";
import {
  ArrowIconDisabled,
  DropDownDisabled,
  DropDownDisabledContainer,
  InputDisabled,
  PlaceholderDisabled,
} from "./styled";

const arrowIcon = require("@/assets/icons/arrow-down.png");

const FieldsDisabled = ({ userInfo }) => {
  return (
    <>
      <InputDisabled>
        <PlaceholderDisabled>{userInfo.name}</PlaceholderDisabled>
      </InputDisabled>
      <InputDisabled>
        <PlaceholderDisabled>{userInfo.email}</PlaceholderDisabled>
      </InputDisabled>
      <InputDisabled>
        <PlaceholderDisabled>{userInfo.phone}</PlaceholderDisabled>
      </InputDisabled>
      <DropDownDisabledContainer>
        <DropDownDisabled
          setSelected={() => {}}
          data={[]}
          placeholder="Seus endereços"
          arrowicon={<ArrowIconDisabled source={arrowIcon} />}
        />
      </DropDownDisabledContainer>
      <InputDisabled>
        <PlaceholderDisabled>Senha</PlaceholderDisabled>
      </InputDisabled>
    </>
  );
};

export default FieldsDisabled;
