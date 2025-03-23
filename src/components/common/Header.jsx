import React from "react";

import classNames from "classnames";
import { Typography } from "neetoui";
import { Trans } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import routes from "src/route";

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex items-center  px-16 py-4">
      <Typography style="h2" weight="bold">
        <Trans
          i18nKey="logoName"
          components={{
            first: <span className="text-blue-600" />,
            second: <span className="text-black" />,
          }}
        />
      </Typography>
      <nav className="ml-6 flex gap-4">
        {[
          { path: routes.movies, key: "routes.movies" },
          { path: routes.favouriteMovie, key: "routes.favouriteMovies" },
        ].map(({ path, key }) => (
          <Link
            key={key}
            to={path}
            className={classNames("text-black hover:text-blue-500", {
              "font-bold text-blue-600": location.pathname === path,
            })}
          >
            <Typography style="body1" weight="medium">
              <Trans i18nKey={key} />
            </Typography>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
