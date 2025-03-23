import React, { useState } from "react";

import { PageLoader, ErrorPage } from "components/common/";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import MovieListItem from "./MovieListItem";

const RenderElement = ({ movies = [], searchQuery }) => {
  const { t } = useTranslation();

  return isEmpty(movies) || !searchQuery ? (
    <NoData
      className="flex h-screen w-full items-center justify-center"
      title={t("noData")}
    />
  ) : (
    <div className="movie-history-container grid grid-cols-1 justify-items-center gap-y-8 overflow-y-scroll py-8 md:grid-cols-3 lg:grid-cols-4">
      {movies.map(movie => (
        <MovieListItem key={movie.imdbID} {...movie} />
      ))}
    </div>
  );
};

const MovieList = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const debounceSearchKey = useDebounce(query);

  const {
    data: movies = {},
    isLoading,
    isError,
  } = useFetchMovies(debounceSearchKey ? { s: debounceSearchKey } : {}, {
    enabled: !!debounceSearchKey,
  });

  return (
    <section className="movie-list flex flex-col bg-[#f5f5f5] px-16 py-8">
      <Input
        className="outline-none my-4 focus:border-blue-300 focus:ring-1"
        placeholder={t("searchMovie")}
        prefix={<Search />}
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {isError && <ErrorPage />}
      {isLoading ? (
        <PageLoader />
      ) : (
        <RenderElement movies={movies.search} searchQuery={debounceSearchKey} />
      )}
    </section>
  );
};

export default MovieList;
