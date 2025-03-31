import { Input, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { withT } from "utils/withT";

const YearInput = ({ values, errors, handleYearChange, t }) => (
  <>
    <Input
      label={t("filterParameters.year")}
      name="year"
      placeholder={t("filterParameters.inputYear")}
      type="search"
      value={values.year}
      onChange={event => handleYearChange(event.target.value)}
    />
    {isEmpty(values.year) ||
      (errors.year && (
        <Typography className="mt-1 text-sm text-red-500">
          {errors.year}
        </Typography>
      ))}
  </>
);

export default withT(YearInput);
