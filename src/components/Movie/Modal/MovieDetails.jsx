import { Typography } from "neetoui";

import { formatMovieDetails } from "./utils/formatRestMovieDetails";

const MovieDetails = ({ movie }) => {
  const { director, actors, boxOffice, year, runTime, language, rated } = movie;

  const details = formatMovieDetails({
    director,
    actors,
    boxOffice,
    year,
    runTime,
    language,
    rated,
  });

  return details.map(({ label, value }) => (
    <Typography key={label} style="body1" weight="bold">
      {label}: <span className="text-gray-500">{value}</span>
    </Typography>
  ));
};

export default MovieDetails;
