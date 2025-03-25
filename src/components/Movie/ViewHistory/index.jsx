import React, { useEffect, useRef } from "react";

import { NoData, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useMovieViewStore from "stores/useMovieViewStore";

import MovieHistoryItems from "./Items";

const ViewMoviesHistory = () => {
  const { t } = useTranslation();
  const { movieList, getCurrentActiveID } = useMovieViewStore();
  const activeId = getCurrentActiveID();

  const itemRefs = useRef({});

  useEffect(() => {
    if (activeId && itemRefs.current[activeId]) {
      itemRefs.current[activeId].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeId]);

  return (
    <section className="h-screen w-1/4 border-l-2 py-2 shadow-lg">
      <Typography className="my-2 text-center" style="h2" weight="bold">
        {t("viewHistory")}
      </Typography>
      <div className="my-8 flex h-4/5  flex-col gap-4 overflow-y-auto  px-4 ">
        {isEmpty(movieList) ? (
          <NoData
            className="flex h-screen w-full items-center justify-center"
            title={t("noHistory")}
          />
        ) : (
          movieList.map(movie => (
            <MovieHistoryItems
              activeId={activeId}
              key={movie.imdbID}
              movie={movie}
              ref={el => (itemRefs.current[movie.imdbID] = el)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ViewMoviesHistory;
