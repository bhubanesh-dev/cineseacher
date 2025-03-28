import React from "react";

import { withT } from "utils/withT";

const ErrorPage = ({ t }) => (
  <div className="flex h-screen w-full items-center justify-center">
    {t("error.somethingWentWrong")}
  </div>
);

export default withT(ErrorPage);
