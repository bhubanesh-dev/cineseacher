import React from "react";

import classNames from "classnames";
import { Typography } from "neetoui";

const ViewMovieItems = ({ name, isSelected, onClick }) => (
  <Typography
    style="body1"
    className={classNames(
      "cursor-pointer rounded-xl border p-2 text-center ",
      isSelected ? " bg-blue-500 text-white" : " bg-gray-200"
    )}
    onClick={onClick}
  >
    {name}
  </Typography>
);

export default ViewMovieItems;
