import { Header, PageNotFound } from "components/common";
import FavoriteMovie from "components/FavoriteMovie";
import Movie from "components/Movie";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import "./App.css";
import routes from "./routes";

const App = () => (
  <main className="page-bg-color h-screen w-full overflow-hidden">
    <Header />
    <Switch>
      <Route exact component={Movie} path={routes.movies} />
      <Route exact component={FavoriteMovie} path={routes.favoriteMovie} />
      <Redirect exact from={routes.root} to={routes.movies} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </main>
);
export default App;
