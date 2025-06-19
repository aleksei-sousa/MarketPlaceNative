import React, { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";

import Header from "@/src/components/common/Header";
import { Container } from "@/src/Styles/Home.styled";
import NavBar from "@/src/components/common/NavBar";
import Loader from "@/src/components/common/Loader";
import ProductList from "@/src/components/common/ProductList";
import productService from "@/src/services/productService";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(Infinity); // começa com infinito
  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    if (page >= total) return;

    try {
      const productsData = await productService.getAllProducts(page);

      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newProducts = productsData.products.filter((p) => !existingIds.has(p._id));
        return [...prev, ...newProducts];
      });



      setTotal(productsData.total);
      setPage((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
// console.log("Produtos recebidos:");
// products.forEach((product, index) => {
//   console.log(`Produto ${index + 1}: ${product.name}`);
//   console.log("Imagens:", product.images);
//   console.log("Primeira imagem:", product.images?.[0]?.url);
// });

  };

  useFocusEffect(
    useCallback(() => {
      if (products.length === 0) {
        handleGetProducts();
      }
    }, [])
  );

  return (
    <Container>
      <Header />
      {!loading ? (
        <ProductList
          products={products}
          handleGetProducts={handleGetProducts}
        />
      ) : (
        <Loader />
      )}
      <NavBar />
    </Container>
  );
};

export default Index;
