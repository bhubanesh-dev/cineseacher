import React from "react";

import MovieList from "./movieList";
import ViewMovieHistory from "./ViewMovieHistory";

const Movie = () => (
  <section className="hidden-scrollbar flex h-screen w-full flex-row ">
    <MovieList />
    <ViewMovieHistory />
  </section>
);

export default Movie;
