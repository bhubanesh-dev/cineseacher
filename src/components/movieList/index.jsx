import React from "react";

import { Search } from "neetoicons";
import { Input } from "neetoui";

import { MOVIE_LIST } from "./constants";
import MovieListItem from "./MovieListItem";

const MovieList = () => (
  <section className="bg-[#f5f5f5] px-16 py-8">
    <Input
      className="outline-none  focus:border-[#add]  focus:ring-1 "
      placeholder="Search Movies..."
      prefix={<Search />}
      type="search"
    />
    <div className="mt-8 grid  grid-cols-2 justify-items-center  gap-y-8  md:grid-cols-3 lg:grid-cols-4">
      {MOVIE_LIST.map(movie => (
        <MovieListItem key={movie.imdbID} {...movie} />
      ))}
    </div>
  </section>
);

export default MovieList;
