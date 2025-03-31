import { existsBy, removeBy } from "neetocist";
import { assoc, isEmpty, pipe, prepend } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMovieViewStore = create(
  persist(
    set => ({
      movieList: [],
      getCurrentActiveMovieID: 0,

      addMovies: movie =>
        set(({ movieList }) => {
          const isMovieExist = existsBy({ imdbID: movie.imdbID }, movieList);

          return {
            movieList: isMovieExist ? movieList : prepend(movie, movieList),
            getCurrentActiveMovieID: movie.imdbID,
          };
        }),

      removeMovies: id =>
        set(state => {
          const updatedMovieList = removeBy({ imdbID: id }, state.movieList);

          return {
            movieList: updatedMovieList,
            getCurrentActiveMovieID: isEmpty(updatedMovieList)
              ? updatedMovieList[0].imdbID
              : 0,
          };
        }),

      deleteAllMoviesHistory: () =>
        set(pipe(assoc("movieList", []), assoc("getCurrentActiveMovieID", 0))),
    }),
    { name: "Movie_List" }
  )
);

export default useMovieViewStore;
