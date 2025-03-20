import React, { useEffect, useState } from "react";

import movieApi from "apis/movieApi";
import PageLoader from "components/common/PageLoader";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import MovieListItem from "./MovieListItem";

const MovieList = () => {
  const { t } = useTranslation();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("spiderman");

  const fetchData = async searchQuery => {
    setLoading(true);
    try {
      const { Search: data } = await movieApi.fetch({ s: searchQuery });

      setMovies(data || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  if (loading) return <PageLoader />;

  return (
    <section className="bg-[#f5f5f5] px-16 py-8">
      <Input
        className="outline-none focus:border-[#add] focus:ring-1"
        placeholder={t("searchMovie")}
        prefix={<Search />}
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {!isEmpty(movies) ? (
        <div className="mt-8 grid grid-cols-2 justify-items-center gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {movies.map(movie => (
            <MovieListItem key={movie.imdbID} {...movie} />
          ))}
        </div>
      ) : (
        <NoData
          className="flex h-screen w-full items-center justify-center"
          title={t("noData")}
        />
      )}
    </section>
  );
};

export default MovieList;
