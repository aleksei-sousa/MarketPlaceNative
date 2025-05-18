import React from "react";
import { Alert } from "react-native";
import { Container, ContentTxt, DeleteBtn, DeleteIcon } from "./styled";

import addressService from "@/src/services/adressService";

const deleteIcon = require("@/assets/icons/trash.png");

const AddressCard = ({ item, address, setAddress }) => {
  const handleDeleteAddress = async () => {
    Alert.alert(
      "Você tem certeza?",
      "Ao fazer isso você deletará permanentemente o end.",
      [
        {
          text: "Sim",
          onPress: () => {
            addressService.deleteAddress(item._id);

            const filteredAddress = address.filter(
              (addressItem) => addressItem._id !== item._id
            );

            setAddress(filteredAddress);
          },
        },
        {
          text: "Não",
        },
      ]
    );
  };

  return (
    <Container>
      <ContentTxt>
        {`Rua: ${item.street} - Nº ${item.number}\nUF: ${item.state}\nCEP: ${item.cep}`}
      </ContentTxt>
      <DeleteBtn onPress={handleDeleteAddress}>
        <DeleteIcon source={deleteIcon} />
      </DeleteBtn>
    </Container>
  );
};

export default AddressCard;
