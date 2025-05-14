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

const CategoryCard = ({ product, favorite }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/product/[id]',
      params: { id: product._id },
    });
  };

  return (
    <Container onPress={handlePress}>
      <Image source={{ uri: product.images[0].url }} />
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
