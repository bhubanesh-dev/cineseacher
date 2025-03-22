import * as R from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMovieViewStore = create(
  persist(
    (set, get) => ({
      movieList: [],
      currentActiveID: 0,

      updateMovieList: obj =>
        set(state => {
          const findMovie = state.movieList.find(
            it => it.imdbID === obj.imdbID
          );

          if (findMovie) {
            return { movieList: state.movieList, currentActiveID: obj.imdbID };
          }

          return {
            movieList: [obj, ...state.movieList],
            currentActiveID: obj.imdbID,
          };
        }),

      getCurrentActiveID: () => get().currentActiveID,

      deleteAllHistory: () =>
        set(R.pipe(R.assoc("movieList", []), R.assoc("currentActiveID", 0))),
    }),
    { name: "Movie_List" }
  )
);

export default useMovieViewStore;
