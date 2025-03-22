import React, { useEffect, useRef } from "react";

import classNames from "classnames";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useMovieViewStore from "stores/useMovieViewStore";

const ViewMovieHistory = () => {
  const { t } = useTranslation();
  const { movieList } = useMovieViewStore();
  const id = useMovieViewStore(state => state.getCurrentActiveID());

  const itemRefs = useRef({});

  useEffect(() => {
    if (id && itemRefs.current[id]) {
      itemRefs.current[id].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [id]);

  return (
    <section className="movie-history  py-8">
      <Typography className="my-4 text-center" style="h2" weight="bold">
        {t("viewHistory")}
      </Typography>
      <div className="movie-history-container mt-8 flex max-h-[500px] flex-col gap-4 overflow-y-auto">
        {movieList.map(it => (
          <Typography
            key={it.imdbID}
            ref={el => (itemRefs.current[it.imdbID] = el)}
            style="body1"
            className={classNames(
              "mx-8 rounded-xl border p-2 text-center",
              id === it.imdbID ? "bg-blue-500 text-white" : "bg-gray-200"
            )}
          >
            {it.title}
          </Typography>
        ))}
      </div>
    </section>
  );
};

export default ViewMovieHistory;
