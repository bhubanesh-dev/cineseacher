import { useMemo } from "react";

import { Typography } from "neetoui";

import { formatMovieDetails } from "./utils/formatRestMovieDetails";

const MovieDetails = ({ movie }) => {
  const { director, actors, boxOffice, year, runTime, language, rated } = movie;
  const movieDetails = {
    director,
    actors,
    boxOffice,
    year,
    runTime,
    language,
    rated,
  };

  const details = useMemo(
    () => formatMovieDetails(movieDetails),
    [movieDetails]
  );

  return details.map(({ label, value }) => (
    <Typography key={label} style="body1" weight="bold">
      {label}: <span className="text-gray-500">{value}</span>
    </Typography>
  ));
};

export default MovieDetails;
