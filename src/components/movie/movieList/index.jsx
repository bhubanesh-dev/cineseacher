import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from "constants";

import React, { useState } from "react";

import { PageLoader, ErrorPage } from "components/common/";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { useTranslation } from "react-i18next";

import MovieListItem from "./MovieListItem";

const RenderElement = ({ movies = [], searchQuery }) => {
  const { t } = useTranslation();

  return movies.length === 0 || !searchQuery ? (
    <NoData
      className="flex h-screen w-full items-center justify-center"
      title={t("noData")}
    />
  ) : (
    <div className="my-4 grid h-4/5 grid-cols-1 justify-items-center gap-y-8 overflow-y-scroll py-8 md:grid-cols-3 lg:grid-cols-4">
      {movies.map(movie => (
        <MovieListItem key={movie.imdbID} {...movie} />
      ))}
    </div>
  );
};

const MovieList = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);
  const debounceSearchKey = useDebounce(query);

  const Params = debounceSearchKey
    ? { s: debounceSearchKey, page: currentPage, pageSize: DEFAULT_PAGE_SIZE }
    : {};

  const {
    data = {},
    isLoading,
    isFetching,
    isError,
  } = useFetchMovies(Params, { enabled: !!debounceSearchKey });

  const { search: movies = [], totalResults = 0 } = data;

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
      {isLoading || isFetching ? (
        <PageLoader />
      ) : (
        <RenderElement movies={movies} searchQuery={debounceSearchKey} />
      )}
      <div className="my-5 self-end">
        <Pagination
          count={totalResults || 0}
          navigate={page => setCurrentPage(page)}
          pageNo={currentPage || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </section>
  );
};

export default MovieList;
