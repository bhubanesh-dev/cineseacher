import i18n from "src/common/i18n";
import * as Yup from "yup";

const maxYear = new Date().getFullYear();

export const VALIDATION_SCHEMA = Yup.object().shape({
  year: Yup.string()
    .nullable()
    .matches(/^\d{4}$/, i18n.t("filterParameters.invalidYear"))
    .test(
      "valid-year-range",
      i18n.t("filterParameters.invalidYear", { min: 2000, max: maxYear }),
      value => {
        if (!value) return false;
        const year = parseInt(value, 10);

        return year >= 2000 && year <= maxYear;
      }
    ),
  movie: Yup.boolean(),
  series: Yup.boolean(),
});
