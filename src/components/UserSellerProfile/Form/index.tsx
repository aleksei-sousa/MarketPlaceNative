import { Alert } from "react-native";
import React, { useState } from "react";
import { BtnImg, Container, EditBtn, EditBtnContainer } from "./styled";
import FieldsDisabled from "./FieldsDisabled";
import FieldsAbled from "./FieldsAbled";

const btnImg = require("@/assets/icons/edit.png");

const Form = ({ userInfo }) => {
  const [editable, setEditable] = useState(false);

  const handleToggleEditable = () => {
    setEditable(!editable);
  };

  return (
    <Container>
      <EditBtnContainer>
        <EditBtn onPress={handleToggleEditable}>
          <BtnImg source={btnImg} />
        </EditBtn>
      </EditBtnContainer>

      {!editable ? (
        <FieldsDisabled userInfo={userInfo} />
      ) : (
        <FieldsAbled userInfo={userInfo} />
      )}
    </Container>
  );
};

export default Form;
