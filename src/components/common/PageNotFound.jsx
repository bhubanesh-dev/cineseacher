import React from "react";

import { NoData } from "neetoui";

const PageNotFound = () => (
  <div className="movie-list-view-history-container-height flex items-center justify-center">
    <NoData
      title="The page you're looking for can't be found"
      primaryButtonProps={{
        label: "Back to home",
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/",
      }}
    />
  </div>
);

export default PageNotFound;
