import React, { useState } from "react";
import { FlatList, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ProductCard from "./ProductCard";
import useAuth from "../../../hook/useAuth";
import favoriteService from "../../../services/favoriteService.js";

const ProductList = ({ products, handleGetProducts }) => {
  const [favorites, setFavorites] = useState([]);
  const { token } = useAuth();

  const handleGetFavorites = async () => {
    if (!token) return;

    try {
      const res = await favoriteService.getFavorites();
      const isLiked = Array.isArray(res.data) ? res.data.map(val => val._id) : [];
      setFavorites(isLiked);
    } catch (err) {
      console.warn("Erro ao buscar favoritos:", err);
    }
  };

  const isFavorite = (product) => {
    return favorites.includes(product._id);
  };

  const renderItem = ({ item }) => (
    <ProductCard data={item} favorite={isFavorite(item)} />
  );

  useFocusEffect(
    React.useCallback(() => {
      handleGetFavorites();
      handleGetProducts();
    }, [token])
  );


  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 16 }}
      onEndReached={handleGetProducts}
      onEndReachedThreshold={0.1}
      initialNumToRender={5}
      ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Nenhum produto encontrado</Text>}
    />
  );
};

export default ProductList;
