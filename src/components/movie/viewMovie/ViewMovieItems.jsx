import React from "react";

import classNames from "classnames";
import { Typography } from "neetoui";
import useMovieViewStore from "stores/useMovieViewStore";

const ViewMovieItems = ({ children }) => {
  const id = useMovieViewStore(state => state.getCurrentActiveID());

  return (
    <Typography
      style="body1"
      className={classNames(
        "mx-8 rounded-xl border p-2 text-center",
        children.props.ref && id === children.props.ref.current?.id
          ? "bg-blue-500 text-white"
          : "bg-gray-200"
      )}
    >
      {children}
    </Typography>
  );
};

export default ViewMovieItems;
