import React from "react";
import {
  Container,
  InfoLikeContainer,
  LikeButton,
  LikeIcon,
  ProductImage,
  ProductInfoContainer,
  ProductPrice,
  ProductPriceTitleContainer,
  ProductTitle,
  PublishedText,
  SellerInfoContainer,
  SellerName,
} from "./styled";
import getDate from "../../../../utils/getData";

//import Like from "../../Like";
//const like = require("../../../../../assets/icons/like.png");
//const liked = require("../../../../../assets/icons/liked.png");
import Constants from 'expo-constants';
const baseUrl = Constants.expoConfig.extra.DATA_BASE_URL;
console.log(baseUrl)

//console.log(baseUrl)
import { Alert } from "react-native";
import { useRouter } from "expo-router";


import Like from "../../Like";

const ProductCard = ({ data, favorite }) => {
  const router = useRouter();

  const handlePress = () => {
    return console.log(data)
    router.push({
      pathname: "/Product", // ou /product/[id] se for dinâmica
    params: {
        product: JSON.stringify(data), // <- aqui você serializa o objeto
      },
    });

  };
  return (
    <Container activeOpacity={0.85} onPress={handlePress}>
      <ProductImage source={{ uri: baseUrl + data.images[0]?.url }} />
      <ProductInfoContainer>
        <ProductPriceTitleContainer>
          <ProductPrice>R$ {data.price}</ProductPrice>
          <ProductTitle numberOfLines={2}>{data.name}</ProductTitle>
        </ProductPriceTitleContainer>
        <InfoLikeContainer>
          <SellerInfoContainer>
            <PublishedText>
              Publicado em {getDate(data.createdAt)} por:
            </PublishedText>
            <SellerName>{data.seller.name}</SellerName>
          </SellerInfoContainer>
          <Like favorites={favorite} productId={data._id} />
        </InfoLikeContainer>
      </ProductInfoContainer>
    </Container>
  );
};

export default ProductCard;
