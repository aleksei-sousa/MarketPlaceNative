import { View, Text, Alert } from "react-native"; 
import { useState } from "react";
import { router } from 'expo-router'

import {
    Bold,
    CompanyLogo,
    Container,
    ForgetPassword,
    Input,
    InputContainer,
    Logo,
    RegisterText,
  } from "@/src/Styles/Login.styled";

import BackIcon from "@/src/components/common/BackIcon";
import DefaultButton from "@/src/components/common/DefaultButton";
import useAuth from "@/src/hook/useAuth";

const logo = require("@/assets/images/logo.png");
const companyLogo = require("@/assets/images/logo-obc.png");

function Login() {

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  //const { login } = useAuth();

  const handleLogin = () => {
    //login(fields.email, fields.password);
  };

    return ( 
      <Container>
        <BackIcon marginLeft={30} />
        <Logo source={logo} />
        <InputContainer>
        <Input
          placeholder="Email"
          placeholderTextColor="#C0C0C1"
          value={fields.email}
          onChangeText={(val) => {
            setFields({
              ...fields,
              email: val,
            });
          }}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Senha"
          placeholderTextColor="#C0C0C1"
          secureTextEntry={true}
          value={fields.password}
          onChangeText={(val) => {
            setFields({
              ...fields,
              password: val,
            });
          }}
        />
      </InputContainer>
      <ForgetPassword>Esqueceu sua senha?</ForgetPassword>
      <DefaultButton
        buttonText="Fazer Login"
        buttonType="primary"
        marginVertical={40}
        buttonHandle={() => {
          handleLogin();
        }}
      />
      <RegisterText
        onPress={() => {
          router.push("/Register");
        }}
      >
        Você ainda não tem conta? <Bold>Registre-se aqui!</Bold>
      </RegisterText>
      <CompanyLogo source={companyLogo} />
      </Container>
     );
}

export default Login;