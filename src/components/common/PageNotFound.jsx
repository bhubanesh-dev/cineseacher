import React from "react";

import { NoData } from "neetoui";
import routes from "routes";
import { withT } from "utils/withT";

const PageNotFound = ({ t }) => (
  <div className="movie-list-view-history-container-height flex items-center justify-center">
    <NoData
      title={t("pageNotFound.title")}
      primaryButtonProps={{
        label: t("pageNotFound.label"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: routes.root,
      }}
    />
  </div>
);

export default withT(PageNotFound);
