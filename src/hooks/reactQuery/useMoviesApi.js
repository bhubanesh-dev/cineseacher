import { QUERY_KEYS } from "constants/query";

// eslint-disable-next-line
import movieApi from "apis/movieApi";

import { useQuery } from "react-query";

export const useShowMovie = id =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, id],
    queryFn: () => movieApi.show({ i: id }),
    enabled: !!id,
  });

export const useFetchMovies = params =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, params],
    queryFn: () => movieApi.fetch(params),
    keepPreviousData: true,
    enabled: !!params.s,
  });
