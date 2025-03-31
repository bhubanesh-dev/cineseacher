import { existsBy, removeBy } from "neetocist";
import { prepend } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoriteMoviesStore = create(
  persist(
    set => ({
      favoriteMoviesList: [],
      toggleFavMovies: movie =>
        set(({ favoriteMoviesList }) => {
          const isMovieInList = existsBy(
            { imdbID: movie.imdbID },
            favoriteMoviesList
          );

          return {
            favoriteMoviesList: isMovieInList
              ? removeBy({ imdbID: movie.imdbID }, favoriteMoviesList)
              : prepend(movie, favoriteMoviesList),
          };
        }),
    }),
    { name: "Favorite_Movie_List" }
  )
);

export default useFavoriteMoviesStore;
