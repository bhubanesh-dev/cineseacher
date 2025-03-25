import React from "react";

import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useFavoriteMoviesStore from "stores/useFavoriteMovieStore";

import FavoriteMovieItem from "./MovieItems";

const FavouriteMovie = () => {
  const { favoriteMoviesList = [] } = useFavoriteMoviesStore();
  const { t } = useTranslation();

  return isEmpty(favoriteMoviesList) ? (
    <NoData
      className="flex  w-full items-center justify-center"
      title={t("noFavoriteMovie")}
    />
  ) : (
    <section className="min-h-4/5 flex flex-col items-center justify-center gap-4 px-16 py-4">
      {favoriteMoviesList.map(it => (
        <FavoriteMovieItem {...it} key={it.imdbID} />
      ))}
    </section>
  );
};

export default FavouriteMovie;
