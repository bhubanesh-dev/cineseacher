import { useMemo } from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const MovieDetails = ({ movie }) => {
  const { t } = useTranslation();
  const details = useMemo(
    () => [
      { label: t("movieDetails.director"), value: movie.director || "N/A" },
      { label: t("movieDetails.actors"), value: movie.actors || "N/A" },
      { label: t("movieDetails.boxOffice"), value: movie.boxOffice || "N/A" },
      { label: t("movieDetails.year"), value: movie.year || "N/A" },
      { label: t("movieDetails.runTime"), value: movie.runTime || "N/A" },
      { label: t("movieDetails.language"), value: movie.language || "N/A" },
      { label: t("movieDetails.rated"), value: movie.rated || "N/A" },
    ],
    [t, movie]
  );

  return details.map(({ label, value }) => (
    <Typography key={label} style="body1" weight="bold">
      {label}: <span className="text-gray-500">{value}</span>
    </Typography>
  ));
};

export default MovieDetails;
