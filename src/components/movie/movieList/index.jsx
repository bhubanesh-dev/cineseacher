import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from "constants";

import React, { useState, useEffect, useRef } from "react";

import { PageLoader, ErrorPage } from "components/common/";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";

import MovieListItem from "./MovieListItem";

const RenderElement = ({ movies = [], searchQuery }) => {
  const { t } = useTranslation();

  return isEmpty(movies) || !searchQuery ? (
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
  const queryParams = useQueryParams();
  const { page, pageSize, s = "" } = queryParams;

  const [searchQuery, setSearchQuery] = useState(s);

  const { t } = useTranslation();

  const history = useHistory();

  const moviesParams = {
    s,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };

  const handlePageNavigation = page => {
    history.replace(buildUrl("/movies", mergeLeft({ page }, queryParams)));
  };

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      s: value || null,
    };
    history.replace(buildUrl("/movies", filterNonNull(params)));
  });

  const {
    data = {},
    isLoading,
    isFetching,
    isError,
  } = useFetchMovies(moviesParams, { enabled: !!moviesParams.s });

  const { search: movies = [], totalResults = 0 } = data;

  const inputElement = useRef(null);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "/") {
        e.preventDefault();
        inputElement.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="movie-list flex flex-col bg-[#f5f5f5] px-16 py-8">
      <Input
        className="outline-none my-4 focus:border-blue-300 focus:ring-1"
        placeholder={t("searchMovie")}
        prefix={<Search />}
        ref={inputElement}
        type="search"
        value={searchQuery}
        onChange={({ target: { value } }) => {
          updateQueryParams(value);
          setSearchQuery(value);
        }}
      />
      {isError && <ErrorPage />}
      {isLoading || isFetching ? (
        <PageLoader />
      ) : (
        <RenderElement movies={movies} searchQuery={moviesParams.s} />
      )}
      <div className="my-5 self-end">
        <Pagination
          count={totalResults || 0}
          navigate={handlePageNavigation}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </section>
  );
};

export default MovieList;
