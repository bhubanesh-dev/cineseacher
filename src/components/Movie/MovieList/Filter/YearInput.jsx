import { Input, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const YearInput = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        label={t("filterParameters.year")}
        name="year"
        placeholder={t("filterParameters.inputYear")}
        value={formik.values.year}
        onChange={formik.handleChange}
      />
      {formik.errors.year && (
        <Typography className="mt-1 text-sm text-red-500">
          {formik.errors.year}
        </Typography>
      )}
    </>
  );
};

export default YearInput;
