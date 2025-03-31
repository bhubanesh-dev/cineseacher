import React, { useEffect, useRef, useState } from "react";

import { Alert, Button, NoData, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation, Trans } from "react-i18next";
import useMovieViewStore from "stores/useMovieViewStore";

import MovieHistoryItems from "./Items";

const ViewMoviesHistory = () => {
  const { t } = useTranslation();

  const { movieList, getCurrentActiveMovieID, deleteAllMoviesHistory } =
    useMovieViewStore.pick();

  const itemRefs = useRef([]);

  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);

  const handleOnAlertSubmit = () => {
    deleteAllMoviesHistory();
    setShouldShowDeleteAlert(false);
  };

  useEffect(() => {
    if (getCurrentActiveMovieID && itemRefs.current[getCurrentActiveMovieID]) {
      itemRefs.current[getCurrentActiveMovieID].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [getCurrentActiveMovieID]);

  return (
    <section className="flex h-screen w-1/4 flex-col border-l-2 py-2 shadow-lg">
      <div className="mx-8 my-2 flex flex-row items-center justify-between border-b-2 border-gray-400 px-6 py-2">
        <Typography style="h2" weight="bold">
          {t("viewHistory")}
        </Typography>
        <Button
          className="hover:pointer text-red-500"
          disabled={isEmpty(movieList)}
          iconSize={30}
          label={t("clearAll")}
          style="tertiary"
          onClick={() => setShouldShowDeleteAlert(true)}
        />
      </div>
      <div className="my-2 flex h-4/5 flex-col gap-4 overflow-y-auto  px-4 ">
        {isEmpty(movieList) ? (
          <NoData
            className="flex h-screen w-full items-center justify-center"
            title={t("noMoviesHistory")}
          />
        ) : (
          movieList.map(movie => (
            <MovieHistoryItems
              key={movie.imdbID}
              {...movie}
              ref={element => (itemRefs.current[movie.imdbID] = element)}
            />
          ))
        )}
      </div>
      <Alert
        isOpen={shouldShowDeleteAlert}
        message={<Trans i18nKey="removeAllConfirmation.message" />}
        submitButtonLabel={t("removeAllConfirmation.button")}
        title={t("removeAllConfirmation.title")}
        onClose={() => setShouldShowDeleteAlert(false)}
        onSubmit={handleOnAlertSubmit}
      />
    </section>
  );
};

export default ViewMoviesHistory;
