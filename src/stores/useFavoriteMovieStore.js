import { reject, prepend, any } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoriteMoviesStore = create(
  persist(
    set => ({
      favoriteMoviesList: [],
      toggleFavMovies: obj =>
        set(({ favoriteMoviesList }) => {
          const isMovieInList = any(
            ({ imdbID }) => imdbID === obj.imdbID,
            favoriteMoviesList
          );

          return {
            favoriteMoviesList: isMovieInList
              ? reject(
                  ({ imdbID }) => imdbID === obj.imdbID,
                  favoriteMoviesList
                )
              : prepend(obj, favoriteMoviesList),
          };
        }),
    }),
    { name: "Fav_Movie_List" }
  )
);

export default useFavoriteMoviesStore;
