import { FALLBACK_IMAGE } from "constants";

export const setFallbackImage = poster =>
  poster === "N/A" ? FALLBACK_IMAGE : poster;
