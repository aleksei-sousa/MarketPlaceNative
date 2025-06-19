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
  const [loading, setLoading] = useState(true);

  const { logout } = useAuth();

  const handleUserInfos = async () => {
    try {
      const { data } = await profileService.getUserProfile();
      console.log("userInfo:", data);

      // se o token estiver inválido ou não for objeto
      if (!data || data.error) {
        console.warn("Token inválido ou erro ao buscar dados:", data?.error);
        logout();
        router.replace("/");
        return;
      }

      setUserInfo(data);
    } catch (err) {
      console.error("Erro ao buscar perfil:", err);
      logout();
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUserInfos();
  }, []);

  const userLogout = () => {
    logout();
    router.replace("/");
  };

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

  if (loading) return <Loader />;

  if (!userInfo) return null;

  return (
    <>
      <Container contentContainerStyle={{ paddingBottom: 120 }}>
        <DefaultTitle fontSize={20} title="MEU PERFIL" />

        <ProfileInfo userInfo={userInfo} />

        <Form userInfo={userInfo} />

        <AddressText onPress={handleManageAddresses}>
          Gerenciar Endereços
        </AddressText>

        <UserAds product={userInfo.products || []} seller={false} />

        <LogOutBtn onPress={userLogout}>
          <LogOutText>Sair da sua conta</LogOutText>
        </LogOutBtn>

        <DeleteAcc onPress={handleDeleteAcc}>Excluir conta</DeleteAcc>
      </Container>
      <NavBar />
    </>
  );
};

export default UserProfile;
