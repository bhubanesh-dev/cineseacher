import React from "react";

import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useFavoriteMoviesStore from "stores/useFavoriteMovieStore";

import FavoriteMovieItem from "./Items";

const FavoriteMovie = () => {
  const favoriteMoviesList = useFavoriteMoviesStore.pickFrom();

  const { t } = useTranslation();

  return isEmpty(favoriteMoviesList) ? (
    <NoData
      className="movie-list-view-history-container-height flex  w-full items-center justify-center"
      title={t("noFavoriteMovie")}
    />
  ) : (
    <section className="mt-6 flex h-4/5 flex-col items-center gap-4 overflow-y-scroll">
      {favoriteMoviesList.map(movie => (
        <FavoriteMovieItem key={movie.imdbID} {...movie} />
      ))}
    </section>
  );
};

export default FavoriteMovie;
