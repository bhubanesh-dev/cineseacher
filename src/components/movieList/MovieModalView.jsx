import React, { useEffect, useState } from "react";

import movieApi from "apis/movieApi";
import { Modal, Spinner, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

const MovieModalView = ({ showModal, id, onClose }) => {
  const [movie, setMovie] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await movieApi.show({ i: id });
        console.log("Fetched Movie Data:", data);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (showModal && id) {
      fetchData();
    }
  }, [showModal, id]);

  return (
    <Modal isOpen={showModal} size="large" onClose={onClose}>
      <div
        className={`flex h-auto flex-col p-8 ${
          !movie && "items-center justify-center"
        }`}
      >
        {movie ? (
          <>
            <Typography className="my-4 font-bold" style="h2">
              {t("movieDetails.title", { title: movie.title })}
            </Typography>
            <div className="flex flex-wrap gap-2">
              {movie.genre?.split(", ").map(genre => (
                <Typography
                  className="rounded-xl bg-gray-200 px-2 py-1"
                  key={genre}
                  style="body3"
                >
                  {genre}
                </Typography>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 ">
              <img
                className=" rounded-lg"
                src={movie.poster || t("fallbackImg")}
              />
              <div className="space-y-2">
                <Typography className="italic" style="body1" weight="normal">
                  {t("movieDetails.plot", { plot: movie.plot })}
                </Typography>
                <Typography className="mt-2" style="body1" weight="medium">
                  <Trans
                    components={{ span: <span className="font-normal" /> }}
                    i18nKey="movieDetails.director"
                    values={{ director: movie.director }}
                  />
                </Typography>
                <Typography style="body1" weight="medium">
                  <Trans
                    components={{ span: <span className="font-normal" /> }}
                    i18nKey="movieDetails.actors"
                    values={{ actors: movie.actors }}
                  />
                </Typography>
                <Typography style="body1" weight="medium">
                  <Trans
                    components={{ span: <span className="font-normal" /> }}
                    i18nKey="movieDetails.boxOffice"
                    values={{ boxOffice: movie.boxOffice }}
                  />
                </Typography>
                <Typography style="body1" weight="medium">
                  <Trans
                    components={{ span: <span className="font-normal" /> }}
                    i18nKey="movieDetails.year"
                    values={{ year: movie.year }}
                  />
                </Typography>
                <Typography style="body1" weight="medium">
                  <Trans
                    components={{ span: <span className="font-normal" /> }}
                    i18nKey="movieDetails.runTime"
                    values={{ runTime: movie.runtime }}
                  />
                </Typography>
                <Typography style="body1" weight="medium">
                  <Trans
                    components={{ span: <span className="font-normal" /> }}
                    i18nKey="movieDetails.language"
                    values={{ language: movie.language }}
                  />
                </Typography>
                <Typography style="body1" weight="medium">
                  <Trans
                    components={{ span: <span className="font-normal" /> }}
                    i18nKey="movieDetails.rated"
                    values={{ rated: movie.rated }}
                  />
                </Typography>
              </div>
            </div>
          </>
        ) : (
          <Spinner size="large" />
        )}
      </div>
    </Modal>
  );
};

export default MovieModalView;
