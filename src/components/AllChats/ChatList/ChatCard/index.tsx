import React from "react";
import { router } from 'expo-router'

import {
  Container,
  Image,
  InfoContainer,
  Price,
  PublishedText,
  SellerContainer,
  SellerName,
  Title,
  TrashButton,
  TrashImage,
  SellerTrashContainer,
} from "./styled";
import { useNavigation } from "@react-navigation/native";
import getDate from "../../../../utils/getData";

const trashIcon = require("@/assets/icons/trash.png");


const ChatCard = ({ data }) => {
  const navigation = useNavigation();

  return (
<Container
  onPress={() => {
    router.push({
      pathname: "/chat",
      params: {
        _id: data._id,
        product: JSON.stringify(data.product),
        sellerName: data.seller.name,
        sellerId: data.seller._id,
        buyerId: data.buyer._id,
        messages: JSON.stringify(data.messages),
      },
    });
  }}
>
      <Image source={{ uri: data.product.images[0].url }} />
      <InfoContainer>
        <Price>R$ {data.product.price}</Price>
        <Title numberOfLines={2}>{data.product.name}</Title>
        <SellerTrashContainer>
          <SellerContainer>
            <PublishedText>
              Publicado em {getDate(data.product.createdAt)} por:
            </PublishedText>
            <SellerName>{data.seller.name}</SellerName>
          </SellerContainer>
          <TrashButton onPress={() => {}}>
            <TrashImage source={trashIcon} />
          </TrashButton>
        </SellerTrashContainer>
      </InfoContainer>
    </Container>
  );
};

export default ChatCard;
