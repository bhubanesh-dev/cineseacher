import { assoc, pipe, prepend, reject, any } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMovieViewStore = create(
  persist(
    (set, get) => ({
      movieList: [],
      currentActiveID: 0,

      addMovies: obj =>
        set(({ movieList }) => {
          const isMovieExist = any(
            ({ imdbID }) => imdbID === obj.imdbID,
            movieList
          );

          return {
            movieList: isMovieExist ? movieList : prepend(obj, movieList),
            currentActiveID: obj.imdbID,
          };
        }),

      removeMovies: id =>
        set(({ movieList, currentActiveID }) => {
          const isMovieExist = any(({ imdbID }) => imdbID === id, movieList);

          return {
            movieList: isMovieExist
              ? reject(({ imdbID }) => imdbID === id, movieList)
              : movieList,

            currentActiveID: currentActiveID === id ? 0 : currentActiveID,
          };
        }),

      getCurrentActiveID: () => get().currentActiveID,

      deleteAllMoviesHistory: () =>
        set(pipe(assoc("movieList", []), assoc("currentActiveID", 0))),
    }),
    { name: "Movie_List" }
  )
);

export default useMovieViewStore;
