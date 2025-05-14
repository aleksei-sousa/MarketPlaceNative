import React, { useEffect, useState } from "react";
import {
  AddressText,
  Container,
  DeleteAcc,
  LogOutBtn,
  LogOutText,
} from "@/src/Styles/UserProfile.styled";
import NavBar from "@/src/components/common/NavBar";
import DefaultTitle from "@/src/components/common/DefaultTitle";
import ProfileInfo from "@/src/components/common/ProfileInfo";
import Form from "@/src/components/UserSellerProfile/Form";
import UserAds from "@/src/components/UserSellerProfile/UserAds";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import useAuth from "@/src/hook/useAuth";
import profileService from "@/src/services/profileService";
import Loader from "@/src/components/common/Loader";

const UserProfile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  const { logout } = useAuth();

  const handleUserInfos = async () => {
    const { data } = await profileService.getUserProfile();
    console.log(data)
    setUserInfo(data);
  };

  useEffect(() => {
    handleUserInfos();
  }, []);

  const handleDeleteAcc = () => {
    Alert.alert(
      "Você tem certeza?",
      "Ao fazer isso você excluirá sua conta para sempre",
      [
        {
          text: "Sim",
          onPress: () => {
            Alert.alert("Você deletou a sua conta!");
            // Aqui futuramente você poderia chamar uma função para deletar o usuário de verdade
          },
        },
        {
          text: "Não",
        },
      ]
    );
  };

  const handleManageAddresses = () => {
    router.push({
      pathname: "/alladdress",
      params: { newAddress: false },
    });
  };

  if (!userInfo) {
    return <Loader />;
  }



  return (
    <>
      <Container contentContainerStyle={{ paddingBottom: 120 }}>
        <DefaultTitle fontSize={20} title="MEU PERFIL" />

        <ProfileInfo userInfo={userInfo} />

        <Form userInfo={userInfo} />

        <AddressText onPress={handleManageAddresses}>
          Gerenciar Endereços
        </AddressText>

        <UserAds product={userInfo.products} seller={false} />

        <LogOutBtn onPress={logout}>
          <LogOutText>Sair da sua conta</LogOutText>
        </LogOutBtn>

        <DeleteAcc onPress={handleDeleteAcc}>Excluir conta</DeleteAcc>
      </Container>
      <NavBar />
    </>
  );
};

export default UserProfile;
