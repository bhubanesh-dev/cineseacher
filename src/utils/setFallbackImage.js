import { FALLBACK_IMAGE } from "constants";

import i18next from "i18next";

export const setFallbackImage = poster =>
  poster === i18next.t("nothing") ? FALLBACK_IMAGE : poster;
