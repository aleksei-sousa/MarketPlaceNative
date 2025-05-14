import React, { useEffect, useState } from "react";
import { Container, SeeMore, Title, TitleContainer } from "./styled.js";
import { FlatList } from "react-native";
import CategoryCard from "./CategoryCard/index";
import { useRouter } from "expo-router";
import useAuth from "../../../hook/useAuth.js";
import favoriteService from "../../../services/favoriteService.js";

const CategoryList = ({ category }) => {
  const [favorites, setFavorites] = useState([]);
  const { token } = useAuth();
  const router = useRouter();

  const handleGetFavorites = async () => {
    if (!token) return;

    const res = await favoriteService.getFavorites();
    const isLiked = res.data.map((val) => val._id);

    setFavorites(isLiked);
  };

  const isFavorite = (product) => {
    return favorites.includes(product._id);
  };

  const renderItem = ({ item }) => (
    <CategoryCard product={item} favorite={isFavorite(item)} />
  );

  const handleSeeMore = () => {
    router.push({
      pathname: "/category/[id]",
      params: { id: category._id },
    });
  };

  useEffect(() => {
    handleGetFavorites();
  }, []);

  return (
    <Container>
      <TitleContainer>
        <Title>{category._id}</Title>
        <SeeMore onPress={handleSeeMore}>
          Ver mais
        </SeeMore>
      </TitleContainer>

      <FlatList
        data={category.products}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default CategoryList;
