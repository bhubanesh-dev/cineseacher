import React, { useState } from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import { MOVIE_LIST } from "./constants";
import ViewMovieItems from "./ViewMovieItems";

const ViewMovieHistory = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      <Typography className="text-center" style="h2" weight="bold">
        {t("viewHistory")}
      </Typography>
      <div className="mt-4 flex flex-col gap-4 overflow-y-scroll">
        {MOVIE_LIST.map((it, index) => (
          <ViewMovieItems
            key={it.imdbId}
            {...it}
            isSelected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </>
  );
};

export default ViewMovieHistory;
