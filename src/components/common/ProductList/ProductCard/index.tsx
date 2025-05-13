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
import getDate from "../../../../utils/getDate";
import { router } from "expo-router";

//import Like from "../../Like";
//const like = require("../../../../../assets/icons/like.png");
//const liked = require("../../../../../assets/icons/liked.png");

function ProductCard({data, favorite}) {
  return ( 
    <Container
      activeOpacity={0.85}
      onPress={() => {
        router.push({
            pathname: "/Product",
            params: {
              id: data.id,
            },
          });
      }}
    >
      {/* <ProductImage
        source={{
          uri: data.images[0].url,
        }}
      />
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
      </ProductInfoContainer> */}
    </Container>
  );
}

export default ProductCard;