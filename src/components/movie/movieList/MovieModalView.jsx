import React from "react";

import { ErrorPage, PageLoader } from "components/common";
import { useShowMovie } from "hooks/reactQuery/useMoviesApi";
import { Modal, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { Trans, useTranslation } from "react-i18next";

const MovieModalView = ({ showModal, id, onClose }) => {
  const { t } = useTranslation();

  const {
    data: movie = {},
    isLoading,
    isError,
  } = useShowMovie(id, {
    enabled: showModal,
  });

  const {
    title = "N/A",
    genre = "",
    poster,
    plot = "N/A",
    director = "N/A",
    actors = "N/A",
    boxOffice = "N/A",
    year = "N/A",
    runtime = "N/A",
    language = "N/A",
    rated = "N/A",
  } = movie;

  const posterImg = poster === "N/A" ? t("fallbackImg") : poster;

  if (isLoading) {
    return (
      <Modal isOpen={showModal} size="large" onClose={onClose}>
        <PageLoader />
      </Modal>
    );
  }

  if (isError || isEmpty(movie)) {
    return (
      <Modal isOpen={showModal} size="large" onClose={onClose}>
        <ErrorPage />
      </Modal>
    );
  }

  return (
    <Modal isOpen={showModal} size="large" onClose={onClose}>
      <div className="min-h-96 flex flex-col p-8">
        <Typography className="my-4 font-bold" style="h1">
          {t("movieDetails.title", { title })}
        </Typography>
        <div className="flex flex-wrap gap-2">
          {genre.split(", ").map(genreItem => (
            <Typography
              className="rounded-xl bg-gray-200 px-2 py-1"
              key={genreItem}
              style="body3"
            >
              {genreItem}
            </Typography>
          ))}
        </div>
        <div className="mt-6 grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2">
          <img alt={title} className="h-96 w-72 rounded-lg" src={posterImg} />
          <div className="flex flex-col space-y-2">
            <Typography className="italic" style="body1" weight="normal">
              {t("movieDetails.plot", { plot })}
            </Typography>
            <Typography className="mt-2" style="body1" weight="bold">
              <Trans
                i18nKey="movieDetails.director"
                values={{ director }}
                components={{
                  span: <span className="font-bold text-gray-500" />,
                }}
              />
            </Typography>
            <Typography style="body1" weight="bold">
              <Trans
                i18nKey="movieDetails.actors"
                values={{ actors }}
                components={{
                  span: <span className="font-bold text-gray-500" />,
                }}
              />
            </Typography>
            <Typography style="body1" weight="bold">
              <Trans
                i18nKey="movieDetails.boxOffice"
                values={{ boxOffice }}
                components={{
                  span: <span className="font-bold text-gray-500" />,
                }}
              />
            </Typography>
            <Typography style="body1" weight="bold">
              <Trans
                i18nKey="movieDetails.year"
                values={{ year }}
                components={{
                  span: <span className="font-bold text-gray-500" />,
                }}
              />
            </Typography>
            <Typography style="body1" weight="bold">
              <Trans
                i18nKey="movieDetails.runTime"
                values={{ runTime: runtime }}
                components={{
                  span: <span className="font-bold text-gray-500" />,
                }}
              />
            </Typography>
            <Typography style="body1" weight="bold">
              <Trans
                i18nKey="movieDetails.language"
                values={{ language }}
                components={{
                  span: <span className="font-bold text-gray-500" />,
                }}
              />
            </Typography>
            <Typography style="body1" weight="bold">
              <Trans
                i18nKey="movieDetails.rated"
                values={{ rated }}
                components={{
                  span: <span className="font-bold text-gray-500" />,
                }}
              />
            </Typography>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModalView;
