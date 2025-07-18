import React from "react";
import { useRouter } from "expo-router";
import {
  Container,
  Image,
  Price,
  SellerLikeContainer,
  SellerName,
  TextContainer,
  Title,
} from "./styled";
import Like from "@/src/components/common/Like"; // ou onde o Like estiver
import Constants from 'expo-constants';
const baseUrl = Constants.expoConfig?.extra?.DATA_BASE_URL || "";


const CategoryCard = ({ product, favorite }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${product._id}`);
    console.log(product._id)
  };
  //console.log(product.images)

  return (
    <Container onPress={handlePress}>
      <Image source={{ uri: baseUrl + product.images[0].url }} />
      <TextContainer>
        <Title>{product.name}</Title>
        <Price>R$ {product.price}</Price>

        <SellerLikeContainer>
          <SellerName>Lucas Queiroga</SellerName>

          <Like favorites={favorite} productId={product._id} />
        </SellerLikeContainer>
      </TextContainer>
    </Container>
  );
};

export default CategoryCard;
