import React, { useRef, useState, useEffect } from "react";

import { useFormik } from "formik";
import { Filter as filterIcon } from "neetoicons";
import { Button, Popover } from "neetoui";
import { useTranslation } from "react-i18next";

import TypeCheckboxes from "./TypeCheckBoxes";
import YearInput from "./YearInput";

import { VALIDATION_SCHEMA } from "../utils/validation";

const FilterParameters = ({
  searchQuery,
  filterQuery,
  setFilterQuery,
  updateQueryParams,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef(null);

  const popoverRef = useRef(null);

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      year: filterQuery?.year || null,
      type: filterQuery?.type || null,
      types: {
        movie: filterQuery?.type === "movie",
        series: filterQuery?.type === "series",
      },
    },
    validationSchema: VALIDATION_SCHEMA,
  });

  useEffect(() => {
    const applyFilter = async () => {
      const errors = await formik.validateForm();

      if (Object.keys(errors).length === 0) {
        setFilterQuery({ year: formik.values.year, type: formik.values.type });
        updateQueryParams({
          year: formik.values.year,
          type: formik.values.type,
          s: searchQuery || null,
        });
      }
    };

    applyFilter();
  }, [formik.values]);

  // Only checks for movie or series toggle types
  const handleTypeChange = selectedType => {
    const { movie, series } = formik.values.types;

    let updatedTypes = {
      movie: selectedType === "movie" ? !movie : false,
      series: selectedType === "series" ? !series : false,
    };

    if (!updatedTypes.movie && !updatedTypes.series) {
      updatedTypes = { movie: false, series: false };
    }

    let newType = null;
    if (updatedTypes.movie) newType = "movie";

    if (updatedTypes.series) newType = "series";

    formik.setValues({
      ...formik.values,
      types: updatedTypes,
      type: newType,
    });
  };

  // Handle auto hide popover on clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="flex items-center justify-center">
      <Button
        icon={filterIcon}
        ref={buttonRef}
        style="tertiary"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Popover
        position="bottom-end"
        reference={buttonRef}
        theme="light"
        visible={isOpen}
      >
        <div className="w-64 p-4" ref={popoverRef}>
          <YearInput formik={formik} />
          <TypeCheckboxes
            formik={formik}
            handleTypeChange={handleTypeChange}
            t={t}
          />
        </div>
      </Popover>
    </div>
  );
};

export default FilterParameters;
