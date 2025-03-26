import { useState } from "react";

import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useMovieViewStore from "stores/useMovieViewStore";

import MovieModalView from "../Modal";

const MovieListItem = ({ title, year, poster, imdbID }) => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const { addMovies } = useMovieViewStore();

  const handleMovieDetailsView = () => {
    setShowModal(true);
    addMovies({ imdbID, title });
  };

  return (
    <div className="min-h-80 flex w-56 flex-col rounded-lg border border-gray-200 bg-white px-6 pb-4 shadow-lg">
      <div className="mx-auto mb-4 w-[80%]">
        <img
          alt={title}
          className="h-44 w-44 object-contain"
          src={poster === "N/A" ? t("fallbackImg") : poster}
        />
      </div>
      <Typography className="mb-2 text-lg font-bold leading-5 text-gray-900">
        {t("title", { title })}
      </Typography>
      <Typography className="mb-2 text-sm font-medium text-gray-600">
        {t("year", { year })}
      </Typography>
      <Button
        className="view-details my-2  w-32 bg-gray-100 font-bold text-blue-500"
        label={t("viewDetails")}
        size="medium"
        style="text"
        onClick={handleMovieDetailsView}
      />
      {showModal && (
        <MovieModalView
          showModal
          id={imdbID}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MovieListItem;
