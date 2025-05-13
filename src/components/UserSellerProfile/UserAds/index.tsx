import React from "react";
import {
  Card,
  Container,
  Image,
  InfoContainer,
  InfoIconContainer,
  NoAds,
  Price,
  PriceTitleContainer,
  PublishedText,
  Title,
  TotalAds,
  IconButton,
  Icon,
} from "./styled";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import getDate from "../../../utils/getDate";
import productService from "../../../services/productService";

const trashIcon = require("@/assets/icons/trash.png");
const favoriteIcon = require("@/assets/icons/like.png");

const UserAds = ({ product, seller }) => {
  const router = useRouter();

  const handleDeleteProduct = async (_id) => {
    const res = await productService.deleteProduct({ _id });

    if (res.status === 204) {
      Alert.alert("Produto deletado com sucesso");
      router.push("/home");
    }
  };

  return (
    <Container>
      <TotalAds>Você tem {product.length} anúncios</TotalAds>

      {product.length > 0 ? (
        product.map((productItem) => (
          <Card
            key={productItem._id}
            activeOpacity={0.85}
            onPress={() => {
              if (!seller) {
                router.push({
                  pathname: "/update-product",
                  params: {
                    _id: productItem._id,
                    name: productItem.name,
                    price: productItem.price,
                    description: productItem.description,
                    images: productItem.images,
                    category: productItem.category,
                    addressId: productItem.address._id,
                    published: productItem.publishedData,
                  },
                });
              } else {
                router.push({
                  pathname: "/product",
                  params: { ...productItem },
                });
              }
            }}
          >
            <Image source={{ uri: productItem.images[0].url }} />

            <InfoContainer>
              <PriceTitleContainer>
                <Price>R$ {productItem.price}</Price>
                <Title numberOfLines={2}>{productItem.name}</Title>
              </PriceTitleContainer>

              <InfoIconContainer>
                <PublishedText>
                  Publicado em {getDate(productItem.createdAt)}
                </PublishedText>

                {!seller ? (
                  <IconButton
                    activeOpacity={0.85}
                    onPress={() =>
                      Alert.alert(
                        "Você tem certeza?",
                        "Ao fazer isso você deleterá permanentemente o produto",
                        [
                          {
                            text: "Sim",
                            onPress: () => handleDeleteProduct(productItem._id),
                          },
                          { text: "Não" },
                        ]
                      )
                    }
                  >
                    <Icon source={trashIcon} />
                  </IconButton>
                ) : (
                  <IconButton activeOpacity={0.85} onPress={() => {}}>
                    <Icon source={favoriteIcon} />
                  </IconButton>
                )}
              </InfoIconContainer>
            </InfoContainer>
          </Card>
        ))
      ) : (
        <NoAds>Por enquanto você não tem anúncios</NoAds>
      )}
    </Container>
  );
};

export default UserAds;
