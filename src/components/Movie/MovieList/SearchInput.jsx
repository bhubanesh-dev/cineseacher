import { useRef } from "react";

import useKeyboardKeyHandle from "hooks/useKeyboardKeyHandle";
import { Search } from "neetoicons";
import { Input } from "neetoui";
import { useTranslation } from "react-i18next";

const SearchInput = ({ searchQuery, setSearchQuery, updateQueryParams }) => {
  const { t } = useTranslation();
  const inputElement = useRef(null);

  useKeyboardKeyHandle("/", () => inputElement.current?.focus());

  return (
    <Input
      className="outline-none my-4 py-2 focus:border-blue-300 focus:ring-1"
      placeholder={t("searchMovie")}
      prefix={<Search />}
      ref={inputElement}
      type="search"
      value={searchQuery}
      onChange={({ target: { value } }) => {
        updateQueryParams(value);
        setSearchQuery(value);
      }}
    />
  );
};

export default SearchInput;
