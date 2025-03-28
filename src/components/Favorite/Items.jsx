import React from "react";

import { Typography } from "neetoui";
import { withT } from "utils/withT";

const FavoriteMovieItem = ({ title, imdbRating, t }) => (
  <div className="flex w-4/5 items-center justify-between rounded-lg border border-l-4 border-gray-300 p-4 shadow-sm">
    <Typography className="text-gray-800" style="h4" weight="bold">
      {title || t("nothing")}
    </Typography>
    <Typography className="text-gray-600" style="body2" weight="medium">
      {t("favoriteMovie.rating")} {imdbRating}/10
    </Typography>
  </div>
);

export default withT(FavoriteMovieItem);
