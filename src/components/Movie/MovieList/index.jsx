import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from "constants";

import React, { useState, useCallback } from "react";

import { PageLoader, ErrorPage } from "components/common/";
import { useFetchMovies } from "hooks/reactQuery/useMoviesApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { isEmpty, mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";

import MoviesContainer from "./Container";
import FilterParameters from "./Filter";
import SearchInput from "./SearchInput";

const MovieList = () => {
  const queryParams = useQueryParams();
  const { page, pageSize, s = "", year = 0, type = "" } = queryParams;

  const [searchQuery, setSearchQuery] = useState(s);
  const [filterQuery, setFilterQuery] = useState({ year, type });

  const history = useHistory();

  const moviesParams = {
    s,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
    y: Number(year) || null,
    type: type || null,
  };

  const handlePageNavigation = page => {
    history.replace(buildUrl("/movies", mergeLeft({ page }, queryParams)));
  };

  const updateQueryParams = useFuncDebounce(
    useCallback(
      query => {
        const { s, year, type } = query || {};
        const isSearchFilled = !isEmpty(s);

        const params = {
          page: isSearchFilled ? DEFAULT_PAGE_INDEX : null,
          s: isSearchFilled ? s : null,
          year: isSearchFilled ? year : null,
          type: isSearchFilled ? type : null,
        };

        history.replace(buildUrl("/movies", filterNonNull(params)));
      },
      [history]
    )
  );

  const {
    data = {},
    isLoading,
    isFetching,
    isError,
  } = useFetchMovies(moviesParams, { enabled: !!moviesParams.s });

  const { search: movies = [], totalResults = 0 } = data;

  return (
    <section className="movie-list-view-history-container-height mt-4 flex w-3/4 flex-col px-16">
      <div className="flex flex-row items-center gap-4">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          updateQueryParams={updateQueryParams}
        />
        {moviesParams.s && (
          <FilterParameters
            filterQuery={filterQuery}
            searchQuery={searchQuery}
            setFilterQuery={setFilterQuery}
            updateQueryParams={updateQueryParams}
          />
        )}
      </div>
      {isError && <ErrorPage />}
      {isLoading || isFetching ? (
        <PageLoader />
      ) : (
        <MoviesContainer
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
