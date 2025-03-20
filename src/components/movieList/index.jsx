import React from "react";

import { MOVIE_LIST } from "./constants";
import MovieListItem from "./MovieListItem";

const MovieList = () => (
  <section>
    <div className="mt-8 grid  grid-cols-2 justify-items-center  gap-y-8  md:grid-cols-3 lg:grid-cols-4">
      {MOVIE_LIST.map(movie => (
        <MovieListItem key={movie.imdbID} {...movie} />
      ))}
    </div>
  </section>
);

export default MovieList;
