import { Input, Typography } from "neetoui";
import { withT } from "utils/withT";

const YearInput = ({ formik, t }) => (
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

export default withT(YearInput);
