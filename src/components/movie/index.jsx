import React from "react";

import MovieList from "./movieList";
import ViewMoviesHistory from "./viewMoviesHistory";

const Movie = () => (
  <section className="hidden-scrollbar flex h-5/6 w-full flex-row ">
    <MovieList />
    <ViewMoviesHistory />
  </section>
);

export default Movie;
