import MovieList from "components/movieList";
import SearchBar from "components/SearchBar";

import "./App.css";

const App = () => (
  <div className="bg-[#f5f5f5] px-16 py-8">
    <SearchBar />
    <MovieList />
  </div>
);

export default App;
