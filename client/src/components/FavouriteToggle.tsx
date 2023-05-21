import { FC } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { AsteroidFeed } from "../services/asteroids/types";
import { useIsFavouriteAsteroid } from "../services/asteroids";

const FavouriteToggle: FC<AsteroidFeed> = (asteroid) => {
  const [isFavouriteState, toggleIsFavourite] =
    useIsFavouriteAsteroid(asteroid);

  return (
    <IconButton
      aria-label="favourite"
      color="error"
      onClick={toggleIsFavourite}
    >
      {isFavouriteState ? (
        <FavoriteIcon fontSize="medium" />
      ) : (
        <FavoriteBorderIcon fontSize="medium" />
      )}
    </IconButton>
  );
};

export default FavouriteToggle;
