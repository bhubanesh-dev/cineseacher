import { FALLBACK_IMAGE } from "constants";

import React from "react";

import { ErrorPage } from "components/common";
import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import { Modal, Spinner, Typography } from "neetoui";
import { any } from "ramda";
import { useTranslation } from "react-i18next";
import useFavoriteMoviesStore from "stores/useFavoriteMovieStore";
import { setFallbackImage } from "utils/setFallbackImage";

import FavoriteButton from "./FavoriteButton";
import GenreTags from "./GenreTags";
import MovieDetails from "./MovieDetails";

const MovieModalView = ({ showModal, id, onClose }) => {
  const { Header, Body } = Modal;

  const {
    data: movie = {},
    isLoading,
    isError,
  } = useShowMovie(id, { enabled: !!id && showModal });

  const { title = "N/A", genre = "", poster } = movie;

  const { t } = useTranslation();

  const { favoriteMoviesList, toggleFavMovies } = useFavoriteMoviesStore();

  const isFavorite = any(item => item.imdbID === id, favoriteMoviesList);

  const handleToggleFavoriteMovie = () => {
    toggleFavMovies({
      title: movie?.title,
      imdbID: movie?.imdbID,
      imdbRating: movie?.imdbRating,
    });
  };

  if (isLoading) {
    return (
      <Modal isOpen={showModal} size="large" onClose={onClose}>
        <div className="flex h-96 items-center justify-center">
          <Spinner />
        </div>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal isOpen={showModal} size="large" onClose={onClose}>
        <ErrorPage />
      </Modal>
    );
  }

  return (
    <Modal isOpen={showModal} size="large" onClose={onClose}>
      <Header>
        <Typography
          className="relative my-4 font-bold"
          style="h1"
          weight="medium"
        >
          {title}
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={handleToggleFavoriteMovie}
          />
        </Typography>
        <GenreTags genre={genre} />
      </Header>
      <Body>
        <div className="my-2 grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2">
          <img
            alt={title}
            className="h-96 w-72 rounded-lg"
            src={setFallbackImage(poster)}
            onError={event => (event.target.src = FALLBACK_IMAGE)}
          />
          <div className="flex flex-col space-y-2">
            <Typography
              className="mb-2 italic text-gray-500"
              style="h4"
              weight="medium"
            >
              {movie.plot || t("nothing")}
            </Typography>
            <MovieDetails movie={movie} />
          </div>
        </div>
      </Body>
    </Modal>
  );
};

export default MovieModalView;
