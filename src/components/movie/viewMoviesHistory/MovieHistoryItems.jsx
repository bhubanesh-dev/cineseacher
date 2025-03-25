import React, { forwardRef } from "react";

import classNames from "classnames";
import { Typography } from "neetoui";

const MovieHistoryItems = forwardRef(({ activeId, movie = {} }, ref) => {
  const { imdbID, title } = movie;

  return (
    <Typography
      ref={ref}
      style="body1"
      className={classNames(
        "mx-8 rounded-xl border p-2 text-center",
        activeId === imdbID
          ? "history-item-selected text-white"
          : "history-item"
      )}
    >
      {title}
    </Typography>
  );
});

MovieHistoryItems.displayName = "MovieHistoryItems";

export default MovieHistoryItems;
