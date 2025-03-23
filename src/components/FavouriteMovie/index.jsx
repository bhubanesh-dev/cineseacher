import React from "react";

import FavoriteMovieItem from "./FavoriteMovieItem";

const FavouriteMovie = () => (
  <section className="flex flex-col items-center justify-center gap-4  px-16 py-4">
    {Array(6)
      .fill(0)
      .map((it, index) => (
        <FavoriteMovieItem {...it} key={index} />
      ))}
  </section>
);

export default FavouriteMovie;
