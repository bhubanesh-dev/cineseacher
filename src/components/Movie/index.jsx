import React from "react";

import MovieList from "./MovieList";
import ViewMoviesHistory from "./ViewHistory";

const Movie = () => (
  <section className=" flex h-5/6 w-full flex-row ">
    <MovieList />
    <ViewMoviesHistory />
  </section>
);

export default Movie;
