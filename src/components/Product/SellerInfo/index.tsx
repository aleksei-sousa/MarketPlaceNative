import React from "react";
import {
  Button,
  Container,
  Name,
  NoRate,
  SeeProfile,
  SellerContainer,
} from "./styled";
import { useRouter } from "expo-router";
import { AirbnbRating } from "react-native-ratings";
import useAuth from "@/src/hook/useAuth";

const SellerInfo = ({ product }) => {
  const router = useRouter();
  const { token } = useAuth();

  const rate = parseInt(product?.seller?.rating ?? 0);

  const handleNavigate = (screen, params = {}) => {
    if (!token) {
      router.push("/(auth)/login");
    } else {
      router.push({ pathname: screen, params });
    }
  };

  if (!product?.seller) return null; // Evita renderizar se não tiver os dados

  return (
    <Container>
      <SellerContainer>
        <Name>{product.seller.name}</Name>

        {!rate ? (
          <NoRate onPress={() => handleNavigate("/feedback")}>
            Sem avaliação{"\n"}Clique e avalie!
          </NoRate>
        ) : (
          <Button onPress={() => handleNavigate("/feedback")}>
            <AirbnbRating
              selectedColor="#5F96ED"
              showRating={false}
              isDisabled={true}
              size={16}
              defaultRating={rate}
            />
          </Button>
        )}
      </SellerContainer>

      <SeeProfile
        onPress={() =>
          router.push({
            pathname: "/seller-profile",
            params: { sellerId: product.seller._id },
          })
        }
      >
        Ver Perfil
      </SeeProfile>
    </Container>
  );
};

export default SellerInfo;
