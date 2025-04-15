import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import Header from "@/src/components/common/Header";
import { Container } from '@/src/Styles/Home.styled';
import Navbar from "@/src/components/common/Navbar";
import Loader from "../src/components/common/Loader";
import ProductList from "@/src/components/common/ProductList";
import productService from "@/src/services/favoriteService";

function Index() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(100);
  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    if (page === total) return;

    const productsData = await productService.getAllProducts(page);

    setProducts([...products, ...productsData.products]);
    //setProducts(prev => [...prev, ...productsData.products]);
    setTotal(productsData.total);
    setLoading(false);
    setPage(page + 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetProducts();
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
      <Navbar />
    </Container>
  );
}

export default Index;
