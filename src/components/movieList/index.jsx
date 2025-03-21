import React, { useEffect, useState } from "react";

import movieApi from "apis/movieApi";
import PageLoader from "components/common/PageLoader";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import MovieListItem from "./MovieListItem";

const RenderElement = ({ movies, t }) =>
  isEmpty(movies) ? (
    <NoData
      className="flex h-screen w-full items-center justify-center"
      title={t("noData")}
    />
  ) : (
    <div className="mt-8 grid grid-cols-1 justify-items-center gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {movies.map(movie => (
        <MovieListItem key={movie.imdbID} {...movie} />
      ))}
    </div>
  );

const MovieList = () => {
  const { t } = useTranslation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const debounceSearchKey = useDebounce(query);

  useEffect(() => {
    const fetchData = async () => {
      if (!debounceSearchKey.trim()) {
        setMovies([]);

        return;
      }

      setLoading(true);
      try {
        const { Search: data } = await movieApi.fetch({ s: debounceSearchKey });
        setMovies(data || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debounceSearchKey]);

  return (
    <section className="flex flex-col bg-[#f5f5f5] px-16 py-8">
      <Input
        className="outline-none my-4 focus:border-[#add] focus:ring-1"
        placeholder={t("searchMovie")}
        prefix={<Search />}
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {loading ? <PageLoader /> : <RenderElement movies={movies} t={t} />}
    </section>
  );
};

export default MovieList;
