import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";

import {
  Button,
  Container,
  DenounceSeller,
  InfoContainer,
  InteractionsContainer,
  Price,
  Share,
  SubTitle,
  SubtitleContainer,
  Title,
} from "@/src/Styles/Product.styled";

import BackIcon from "@/src/components/common/BackIcon";
import Carousel from "@/src/components/Product/Carousel";
import Description from "@/src/components/Product/Description";
import SellerInfo from "@/src/components/Product/SellerInfo";
import DefaultButton from "@/src/components/common/DefaultButton";
import Like from "@/src/components/common/Like";

import useAuth from "@/src/hook/useAuth";
import getDate from "@/src/utils/getData";
import favoriteService from "@/src/services/favoriteService";
import chatService from "@/src/services/chatService";

const shareIcon = require("@/assets/icons/share.png");

const Product = () => {
  const [liked, setLiked] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

const { product: productString } = useLocalSearchParams();
const product = JSON.parse(productString || "{}");
console.log(product)

  const handleGetFavorites = async () => {
    if (!token) return;

    try {
      const res = await favoriteService.getFavorites();
      const isLiked = Array.isArray(res.data)
        ? res.data.some((item) => item._id === product._id)
        : false;
      setLiked(isLiked);
    } catch (err) {
      console.error("Erro ao obter favoritos:", err);
    }
  };

  const handleChatSeller = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const { _id: buyerId } = JSON.parse(user || "{}");

      const initialMessage = `Olá, quero saber mais sobre o seu produto, ${product.seller.name}`;

      const res = await chatService.startChat({
        product: product._id,
        seller: product.seller._id,
        initialMessage,
      });

      if (res.status === 201) {
        router.push({
          pathname: "/chat",
          params: {
            product: JSON.stringify(product),
            sellerName: product.seller.name,
            sellerId: product.seller._id,
            buyerId,
            initialMessage,
          },
        });
      }
    } catch (err) {
      console.error("Erro ao iniciar chat:", err);
    }
  };

  useEffect(() => {
    handleGetFavorites();
  }, [product._id]);

  return (
    <Container contentContainerStyle={{ paddingBottom: 50 }}>
      <BackIcon marginLeft={30} />

      <Title>{product.name}</Title>
      <SubtitleContainer>
        {/* <SubTitle>Publicado em {product.createdAt}</SubTitle> */}
        <SubTitle>Publicado em {getDate(product.createdAt)}</SubTitle>
        <SubTitle>
          {product.address?.city}, {product.address?.state}
        </SubTitle>
      </SubtitleContainer>

      <Carousel images={product.images} />

      <InfoContainer>
        <Price>R$ {product.price}</Price>
        <InteractionsContainer>
          <Like favorites={liked} productId={product._id} />
          <Button>
            <Share source={shareIcon} />
          </Button>
        </InteractionsContainer>
      </InfoContainer>

      <Description desc={product.description} />
      <SellerInfo product={product} />

      <DefaultButton
        buttonText="FALE COM O VENDEDOR"
        buttonType="primary"
        marginVertical={0}
        buttonHandle={handleChatSeller}
      />

      <DenounceSeller
        onPress={() => {
          token ? router.push("/denounce") : router.push("/login");
        }}
      >
        Denunciar o vendedor!
      </DenounceSeller>
    </Container>
  );
};

export default Product;
