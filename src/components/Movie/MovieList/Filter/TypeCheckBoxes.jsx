import { Label, Checkbox } from "neetoui";
import { withT } from "utils/withT";

const TypeCheckboxes = ({ formik, handleTypeChange, t }) => (
  <>
    <Label className="my-4">{t("filterParameters.type")}</Label>
    <div className="flex flex-row items-center justify-between">
      <Checkbox
        checked={formik.values.types.movie}
        id="checkbox_movie"
        label={t("filterParameters.movie")}
        onChange={() => handleTypeChange("movie")}
      />
      <Checkbox
        checked={formik.values.types.series}
        id="checkbox_series"
        label={t("filterParameters.series")}
        onChange={() => handleTypeChange("series")}
      />
    </div>
  </>
);

export default withT(TypeCheckboxes);
