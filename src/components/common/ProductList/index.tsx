import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';

import { FlatList } from "react-native";
import ProductCard from "./ProductCard";

import useAuth from "../../../hook/useAuth";
import favoriteService from "../../../services/favoriteService.js";

const ProductList = ({ products, handleGetProducts }) => {
  const [favorites, setFavorites] = useState([]);
  const { token } = useAuth();

  const handleGetFavorites = async () => {
    if (!token) return;

    const res = await favoriteService.getFavorites();

    const isLiked = res.data.map((val) => val._id);

    setFavorites(isLiked);
  };

  const isFavorite = (product) => {
    return !!favorites.find((favorite) => product._id === favorite);
  };

  const renderItem = ({ item }) => (
    <ProductCard data={item} favorite={isFavorite(item)} />
  );

  useFocusEffect(
    React.useCallback(() => {
      handleGetProducts();
    }, [])
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80 }}
      onEndReached={handleGetProducts}
    />
  );
};

export default ProductList;
