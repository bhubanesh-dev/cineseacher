import React, { useState } from "react";

import { Formik } from "formik";
import { Close, Filter as FilterIcon } from "neetoicons";
import { Button, Dropdown } from "neetoui";

import { MAX_YEAR, MIN_YEAR, VALIDATION_SCHEMA } from "./constants";
import TypeCheckboxes from "./TypeCheckBoxes";
import YearInput from "./YearInput";

const Filter = ({
  searchQuery,
  filterQuery,
  setFilterQuery,
  updateQueryParams,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { year, type } = filterQuery;

  const INITIAL_VALUE = {
    year,
    type,
    movie: !type || type === "movie",
    series: !type || type === "series",
  };

  const handleTypeChange = (type, setFieldValue, values) => {
    const newValue = !values[type];
    setFieldValue(type, newValue);

    const updatedValues = { ...values, [type]: newValue };

    if (
      (updatedValues.movie && updatedValues.series) ||
      (!updatedValues.movie && !updatedValues.series)
    ) {
      updateFilterQuery({ type: "" });
    } else if (updatedValues.movie) {
      updateFilterQuery({ type: "movie" });
    } else {
      updateFilterQuery({ type: "series" });
    }
  };

  const handleYearChange = (year, setFieldValue) => {
    setFieldValue("year", year);
    if (year === "") {
      updateFilterQuery({ year });
    } else if (Number(year) >= MIN_YEAR && Number(year) <= MAX_YEAR) {
      updateFilterQuery({ year });
    }
  };

  const updateFilterQuery = ({
    year = filterQuery.year,
    type = filterQuery.type,
  } = {}) => {
    setFilterQuery({ year, type });
    updateQueryParams({
      searchTerm: searchQuery,
      year: year !== "" ? year : null,
      type: type !== "" ? type : null,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Dropdown
        closeOnSelect={false}
        isOpen={isOpen}
        customTarget={
          <Button
            icon={FilterIcon}
            style="text"
            onClick={() => setIsOpen(true)}
          />
        }
        onClickOutside={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      >
        <div className="w-64 p-6">
          <div className="flex justify-end">
            <Close
              className="h-4 w-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <Formik
            initialValues={INITIAL_VALUE}
            validationSchema={VALIDATION_SCHEMA}
          >
            {({ values, errors, setFieldValue, validateField }) => (
              <form className="space-y-3">
                <YearInput
                  {...{
                    values,
                    errors,
                    validateField,
                    setFieldValue,
                    handleYearChange: year =>
                      handleYearChange(year, setFieldValue, errors),
                  }}
                />
                <TypeCheckboxes
                  {...{
                    values,
                    handleTypeChange: type =>
                      handleTypeChange(type, setFieldValue, values),
                  }}
                />
              </form>
            )}
          </Formik>
        </div>
      </Dropdown>
    </div>
  );
};

export default Filter;
