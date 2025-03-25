import { Header, PageNotFound } from "components/common";
import FavouriteMovie from "components/Favourite";
import Movie from "components/Movie";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import "./App.css";
import routes from "./route";

const App = () => (
  <main className="h-screen w-full overflow-hidden">
    <Header />
    <Switch>
      <Route exact component={Movie} path={routes.movies} />
      <Route exact component={FavouriteMovie} path={routes.favouriteMovie} />
      <Redirect exact from="/" to={routes.movies} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </main>
);
export default App;
