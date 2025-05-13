import React, { useEffect, useState } from "react";
import { Container } from "@/src/Styles/Categories.styled";
import DefaultTitle from "@/src/components/common/DefaultTitle";
import NavBar from "@/src/components/common/NavBar";
import CategoryList from "@/src/components/Categories/CategoryList";
import categoryService from "@/src/services/categoryService";
import Loader from "@/src/components/common/Loader";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const handleGetCategories = async () => {
    const res = await categoryService.getCategories();
    setCategories(res.data);
    setLoading(false);
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Container contentContainerStyle={{ paddingBottom: 100 }}>
            <DefaultTitle title="TODAS AS CATEGORIAS" fontSize={20} />
            {categories.map((category) => (
              <CategoryList key={category._id} category={category} />
            ))}
          </Container>
          <NavBar />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Categories;
