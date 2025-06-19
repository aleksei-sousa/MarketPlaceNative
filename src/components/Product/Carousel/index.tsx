import React from "react";
import { Dimensions, FlatList } from "react-native";
import { Container, ProductImage } from "./styled";
import Constants from 'expo-constants';

const baseUrl = Constants.expoConfig.extra.DATA_BASE_URL;
const { width } = Dimensions.get("window");

const Carousel = ({ images }) => {
  if (!Array.isArray(images) || images.length === 0) return null;

  const itemWidth = width * 0.8 - 30;
  const snapOffsets = images.map((_, i) => i * (itemWidth + 10));

  const renderItem = ({ item }) => {
    return <ProductImage source={{ uri: baseUrl + item.url }} />;
  };

  return (
    <Container>
      <FlatList
        data={images}
        keyExtractor={(item, index) => item.url + index}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToAlignment="start"
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToOffsets={snapOffsets}
      />
    </Container>
  );
};

export default Carousel;
