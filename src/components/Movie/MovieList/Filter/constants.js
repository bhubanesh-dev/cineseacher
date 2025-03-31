import dayjs from "dayjs";
import i18n from "src/common/i18n";
import * as Yup from "yup";

export const MAX_YEAR = dayjs().year();
export const MIN_YEAR = 2000;

export const VALIDATION_SCHEMA = Yup.object().shape({
  year: Yup.string()
    .nullable()
    .matches(/^\d{4}$/, i18n.t("filterParameters.invalidYear"))
    .test(
      "valid-year-range",
      i18n.t("filterParameters.invalidYear", { min: MIN_YEAR, max: MAX_YEAR }),
      value => {
        if (!value) return false;
        const year = parseInt(value, 10);

        return year >= MIN_YEAR && year <= MAX_YEAR;
      }
    ),
});
