import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from "constants";

import { NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import MovieListItem from "./Items";

const MoviesListContainer = ({
  movies,
  totalResults,
  page,
  handlePageNavigation,
  searchQuery,
}) => {
  const { t } = useTranslation();

  if (isEmpty(movies) || !searchQuery) {
    return (
      <NoData
        className="flex h-screen w-full items-center justify-center"
        title={t("noData")}
      />
    );
  }

  return (
    <>
      <div className="my-4 grid h-5/6 grid-cols-1 justify-items-center gap-y-8 overflow-y-scroll py-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map(movie => (
          <MovieListItem key={movie.imdbID} {...movie} />
        ))}
      </div>
      <div className="my-5 self-end">
        <Pagination
          count={totalResults}
          navigate={handlePageNavigation}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default MoviesListContainer;
