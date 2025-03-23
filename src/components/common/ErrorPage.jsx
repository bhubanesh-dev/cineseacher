import React from "react";

import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {t("error.loadingMovie")}
    </div>
  );
};

export default ErrorPage;
