import { assoc, pipe, prepend, reject, any } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMovieViewStore = create(
  persist(
    (set, get) => ({
      movieList: [],
      getCurrentActiveMovieID: 0,

      addMovies: movie =>
        set(({ movieList }) => {
          const isMovieExist = any(
            ({ imdbID }) => imdbID === movie.imdbID,
            movieList
          );

          return {
            movieList: isMovieExist ? movieList : prepend(movie, movieList),
            getCurrentActiveMovieID: movie.imdbID,
          };
        }),

      removeMovies: id =>
        set(state => {
          const isMovieExist = any(
            ({ imdbID }) => imdbID === id,
            state.movieList
          );
          let updatedMovieList = state.movieList;

          if (isMovieExist) {
            updatedMovieList = reject(
              ({ imdbID }) => imdbID === id,
              state.movieList
            );
          }

          let newActiveID = state.getCurrentActiveMovieID;

          if (newActiveID === id) {
            if (updatedMovieList.length > 0) {
              newActiveID = updatedMovieList[0].imdbID;
            } else {
              newActiveID = null;
            }
          }

          return {
            movieList: updatedMovieList,
            getCurrentActiveMovieID: newActiveID,
          };
        }),

      getCurrentActiveID: () => get().getCurrentActiveMovieID,

      deleteAllMoviesHistory: () =>
        set(pipe(assoc("movieList", []), assoc("getCurrentActiveMovieID", 0))),
    }),
    { name: "Movie_List" }
  )
);

export default useMovieViewStore;
