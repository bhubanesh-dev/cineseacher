import React from "react";

import MovieList from "./movieList";
import ViewMovieHistory from "./viewMovie";

const Movie = () => (
  <section className="hidden-scrollbar flex h-screen w-full flex-row ">
    <MovieList />
    <ViewMovieHistory />
  </section>
);

export default Movie;
