/**
 * Receives a movie object and formats it into an array of { label, value } objects.
 * - `label` contains the localized text using i18next.
 * - `value` contains the corresponding movie detail, converting objects to JSON strings if necessary.
 * - If a value is missing, it falls back to a default translation.
 *
 */

import { t } from "i18next";

export const formatMovieDetails = movie => {
  if (!movie || typeof movie !== "object") return [];

  const data = Object.entries(movie).map(([key, value]) => ({
    label: t(`movieDetails.${key}`),
    value: value || t("nothing"),
  }));

  console.log(data);

  return data;
};
