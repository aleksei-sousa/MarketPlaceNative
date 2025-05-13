import React, { useEffect, useState } from "react";
import favoriteService from "../../../services/favoriteService";
import { LikeButton, LikeImage } from "./styled.js";

const like = require("../../../../assets/icons/like.png");
const liked = require("../../../../assets/icons/liked.png");

const Like = ({ favorites, productId }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const FavoriteToggle = (favorited) => {
    if (favorited) {
      favoriteService.delFavorite(productId);
      setIsFavorited(false);
    } else {
      favoriteService.setFavorite(productId);
      setIsFavorited(true);
    }
  };

  useEffect(() => {
    setIsFavorited(favorites);
  }, [favorites]);

  return (
    <>
      <LikeButton
        onPress={() => {
          FavoriteToggle(isFavorited);
        }}
      >
        <LikeImage source={isFavorited ? liked : like} />
      </LikeButton>
    </>
  );
};

export default Like;
