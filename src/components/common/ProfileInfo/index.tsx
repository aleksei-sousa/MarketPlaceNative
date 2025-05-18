import { View, Text } from "react-native";
import React from "react";
import {
  Button,
  Container,
  DefaultText,
  Hr,
  Name,
  NamePhoneContainer,
  Phone,
  PrincipalInfoContainer,
} from "./styled";
import { AirbnbRating } from "react-native-ratings";
import { useRouter } from "expo-router";
import useAuth from "../../../hook/useAuth";
import getDate from "../../../utils/getData";

const ProfileInfo = ({ userInfo }) => {
  if (!userInfo) return null; // ← Verifica logo de início

  const router = useRouter();
  const { token } = useAuth();

  const Rate = userInfo.averageRating;

  const handleNavigate = () => {
    if (!token) {
      router.push("/Login");
    } else {
      router.push("/feedback");
    }
  };

  console.log("userInfob:", userInfo);

  return (
    <>
      <Container>
        <PrincipalInfoContainer>
          <NamePhoneContainer>
            <Name>{userInfo.name}</Name>
            <Phone>{userInfo.phone}</Phone>
          </NamePhoneContainer>

          {!Rate ? (
            <DefaultText onPress={handleNavigate}>
              Sem Avaliações{"\n"}Clique e avalie!
            </DefaultText>
          ) : (
            <Button onPress={handleNavigate}>
              <AirbnbRating
                selectedColor="#5F96ED"
                showRating={false}
                isDisabled={true}
                size={16}
                defaultRating={Rate}
                starContainerStyle={{
                  paddingTop: 4,
                }}
              />
            </Button>
          )}
        </PrincipalInfoContainer>

        <DefaultText>
          Usuário desde {userInfo?.createdAt ? getDate(userInfo.createdAt) : "data desconhecida"}
        </DefaultText>

        <DefaultText>
          {userInfo.products.length.toString().padStart(2, "0")} anúncios ativos
        </DefaultText>
      </Container>
      <Hr />
    </>
  );
};


export default ProfileInfo;
