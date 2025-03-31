import { useRef } from "react";

import useKeyboardKeyHandle from "hooks/useKeyboardKeyHandle";
import { Search } from "neetoicons";
import { Input } from "neetoui";
import { withT } from "utils/withT";

const SearchInput = ({
  searchQuery,
  setSearchQuery,
  filterQuery,
  updateQueryParams,
  t,
}) => {
  const inputElement = useRef(null);

  useKeyboardKeyHandle("/", () => inputElement.current?.focus());

  return (
    <Input
      className=" my-4 w-full py-2  focus:ring-1"
      placeholder={t("searchMovie")}
      prefix={<Search />}
      ref={inputElement}
      type="search"
      value={searchQuery}
      onChange={({ target: { value } }) => {
        updateQueryParams({ searchTerm: value, ...filterQuery });
        setSearchQuery(value);
      }}
    />
  );
};

export default withT(SearchInput);
