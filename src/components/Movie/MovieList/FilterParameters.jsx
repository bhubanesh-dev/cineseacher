import React, { useRef, useState, useEffect } from "react";

import { Filter } from "neetoicons";
import { Checkbox, Button, Popover, Input, Label } from "neetoui";
import { useTranslation } from "react-i18next";

const FilterParameters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    year: "",
    movie: false,
    series: false,
  });

  const buttonRef = useRef(null);
  const popoverRef = useRef(null);
  const { t } = useTranslation();

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex items-center justify-center">
      <Button
        icon={Filter}
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
        <div className="w-48 p-4" ref={popoverRef}>
          <Input
            label={t("filterParmaters.year")}
            placeholder={t("filterParmaters.inputYear")}
            value={appliedFilters.year}
            onChange={e =>
              setAppliedFilters({
                ...appliedFilters,
                year: e.target.value,
              })
            }
          />
          <Label className="my-4">{t("filterParmaters.type")}</Label>
          <div className="flex flex-row items-center justify-between">
            <Checkbox
              checked={appliedFilters.movie}
              id="checkbox_movie"
              label={t("filterParmaters.movie")}
              onChange={() =>
                setAppliedFilters(prev => ({ ...prev, movie: !prev.movie }))
              }
            />
            <Checkbox
              checked={appliedFilters.series}
              id="checkbox_series"
              label={t("filterParmaters.series")}
              onChange={() =>
                setAppliedFilters(prev => ({ ...prev, series: !prev.series }))
              }
            />
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default FilterParameters;
