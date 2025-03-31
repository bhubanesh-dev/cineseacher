import { existsBy, removeBy } from "neetocist";
import { assoc, pipe, prepend } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMovieViewStore = create(
  persist(
    set => ({
      movieList: [],
      currentActiveMovieID: 0,

      addMovies: movie =>
        set(({ movieList }) => {
          const isMovieExist = existsBy({ imdbID: movie.imdbID }, movieList);

          return {
            movieList: isMovieExist ? movieList : prepend(movie, movieList),
            currentActiveMovieID: movie.imdbID,
          };
        }),

      removeMovies: id =>
        set(({ movieList, currentActiveMovieID }) => {
          const updatedMovieList = removeBy({ imdbID: id }, movieList);

          return {
            movieList: updatedMovieList,
            currentActiveMovieID:
              currentActiveMovieID === id
                ? updatedMovieList[0].imdbID
                : currentActiveMovieID,
          };
        }),

      deleteAllMoviesHistory: () =>
        set(pipe(assoc("movieList", []), assoc("currentActiveMovieID", 0))),
    }),
    { name: "Movie_List" }
  )
);

export default useMovieViewStore;
