import { Search } from "neetoicons";
import { Input } from "neetoui";

const SearchBar = () => (
  <Input
    className="outline-none  focus:border-[#add]  focus:ring-1 "
    placeholder="Search Movies..."
    prefix={<Search />}
    type="search"
  />
);

export default SearchBar;
