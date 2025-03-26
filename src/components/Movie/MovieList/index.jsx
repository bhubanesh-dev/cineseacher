import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from "constants";

import React, { useState } from "react";

import { PageLoader, ErrorPage } from "components/common/";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";

import MoviesCointainer from "./Cointainer";
import FilterParameters from "./FilterParameters";
import SearchInput from "./SearchInput";

const MovieList = () => {
  const queryParams = useQueryParams();
  const { page, pageSize, s = "" } = queryParams;
  const [searchQuery, setSearchQuery] = useState(s);
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

  return (
    <section className="movielist-viewhistory-container-height flex w-3/4 flex-col px-16">
      <div className="flex flex-row items-center gap-4">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          updateQueryParams={updateQueryParams}
        />
        <FilterParameters />
      </div>
      {isError && <ErrorPage />}
      {isLoading || isFetching ? (
        <PageLoader />
      ) : (
        <MoviesCointainer
          handlePageNavigation={handlePageNavigation}
          movies={movies}
          page={page}
          searchQuery={moviesParams.s}
          totalResults={totalResults}
        />
      )}
    </section>
  );
};

export default MovieList;
