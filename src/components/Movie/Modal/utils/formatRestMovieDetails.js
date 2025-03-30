import { t } from "i18next";

export const formatMovieDetails = movie => {
  if (!movie || typeof movie !== "object") return [];

  const data = Object.entries(movie).map(([key, value]) => ({
    label: t(`movieDetails.${key}`),
    value: value || t("nothing"),
  }));

  return data;
};
