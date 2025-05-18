import React, { useState } from "react";
import { Alert } from "react-native";

import {
    Container, Input, InputContainer, InputMask
  } from "@/src/Styles/AddAddress.styled";

import DefaultTitle from "../../src/components/common/DefaultTitle/";
import DefaultButton from "../../src/components/common/DefaultButton";
import axios from "axios";
import addressService from "../../src/services/adressService";
import { useRouter } from "expo-router";

const AddAddress = () => {
  const router = useRouter();
  const [fields, setFields] = useState({
    cep: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
  });

  const handleGetAddress = async () => {
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${fields.cep}/json/`
      );

      setFields({
        ...fields,
        street: data.logradouro,
        state: data.uf,
        city: data.localidade,
        district: data.bairro,
      });
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
      Alert.alert("Erro ao buscar o endereço. Verifique o CEP e tente novamente.");
    }
  };

  const handleAddAddress = async () => {
    if (fields.cep.length < 8) {
      Alert.alert("Você precisa preencher o seu CEP!");
      return;
    } else if (
      !fields.city ||
      !fields.district ||
      !fields.number ||
      !fields.state ||
      !fields.street
    ) {
      Alert.alert("Algum dos seus campos obrigatórios está vazio!");
      return;
    }

    try {
      const params = fields;
      const data = await addressService.addAddress(params);

      if (data.status === 201) {
        router.push({
          pathname: "/alladdress",  // ← ajuste o caminho correto da sua tela de endereços
          params: { newAddress: true },
        });
      }
    } catch (error) {
      console.error("Erro ao cadastrar o endereço:", error);
      Alert.alert("Erro ao cadastrar o endereço. Tente novamente.");
    }
  };

  return (
    <Container contentContainerStyle={{ paddingBottom: 40 }}>
      <DefaultTitle title="CADASTRAR ENDEREÇO" fontSize={20} />

      <InputContainer>
        <InputMask
          type="zip-code"
          placeholder="Cep"
          placeholderTextColor="#C0C0C1"
          value={fields.cep}
          onChangeText={(value) => {
            setFields({ ...fields, cep: value.replace(/[^0-9]/g, "") });
          }}
          onBlur={handleGetAddress}
        />
      </InputContainer>

      <InputContainer>
        <Input
          placeholder="Rua"
          placeholderTextColor="#C0C0C1"
          value={fields.street}
          onChangeText={(value) => {
            setFields({ ...fields, street: value });
          }}
        />
      </InputContainer>

      <InputContainer>
        <Input
          placeholder="Número da casa/prédio"
          placeholderTextColor="#C0C0C1"
          keyboardType="number-pad"
          value={fields.number}
          onChangeText={(value) => {
            setFields({ ...fields, number: value });
          }}
        />
      </InputContainer>

      <InputContainer>
        <Input
          placeholder="Complemento"
          placeholderTextColor="#C0C0C1"
          value={fields.complement}
          onChangeText={(value) => {
            setFields({ ...fields, complement: value });
          }}
        />
      </InputContainer>

      <InputContainer>
        <Input
          placeholder="Bairro"
          placeholderTextColor="#C0C0C1"
          value={fields.district}
          onChangeText={(value) => {
            setFields({ ...fields, district: value });
          }}
        />
      </InputContainer>

      <InputContainer>
        <Input
          placeholder="Cidade"
          placeholderTextColor="#C0C0C1"
          value={fields.city}
          onChangeText={(value) => {
            setFields({ ...fields, city: value });
          }}
        />
      </InputContainer>

      <InputContainer>
        <Input
          placeholder="Estado"
          placeholderTextColor="#C0C0C1"
          maxLength={2}
          value={fields.state}
          onChangeText={(value) => {
            setFields({ ...fields, state: value });
          }}
        />
      </InputContainer>

      <DefaultButton
        buttonText="Cadastrar Endereço"
        buttonType="primary"
        buttonHandle={handleAddAddress}
        marginVertical={30}
      />
    </Container>
  );
};

export default AddAddress;
