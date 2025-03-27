import React from "react";

import classNames from "classnames";
import { Typography } from "neetoui";
import { Trans } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import routes from "src/routes";

const Header = () => {
  const location = useLocation();
  const NavigationRoutes = [
    { path: routes.movies, key: "routes.movies" },
    { path: routes.favoriteMovie, key: "routes.favoriteMovies" },
  ];

  return (
    <header className="borer-b-2 flex h-auto items-center px-16 py-4 shadow-md">
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
        {NavigationRoutes.map(({ path, key }) => (
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
