import React, { forwardRef, useState } from "react";

import classNames from "classnames";
import { Delete } from "neetoicons";
import { Typography, Alert, Button } from "neetoui";
import { useTranslation, Trans } from "react-i18next";
import useMovieViewStore from "stores/useMovieViewStore";

const MovieHistoryItems = forwardRef(({ imdbID, title }, ref) => {
  const { removeMovies, getCurrentActiveMovieID } = useMovieViewStore.pick();

  const activeId = getCurrentActiveMovieID;

  const { t } = useTranslation();

  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);

  const handleOnAlertSubmit = () => {
    removeMovies(imdbID);
    setShouldShowDeleteAlert(false);
  };

  return (
    <div
      ref={ref}
      className={classNames(
        "mx-8 flex h-12 flex-row items-center justify-between rounded-xl border px-6 py-2 ",
        activeId === imdbID
          ? "history-item-selected text-white"
          : "history-item"
      )}
    >
      <Typography className="w-48 truncate" style="body1">
        {title}
      </Typography>
      <Button
        icon={Delete}
        iconSize={30}
        style="tertiary"
        onClick={() => setShouldShowDeleteAlert(true)}
      />
      <Alert
        isOpen={shouldShowDeleteAlert}
        submitButtonLabel={t("removeItemConfirmation.button")}
        title={t("removeItemConfirmation.title")}
        message={
          <Trans i18nKey="removeItemConfirmation.message" values={{ title }} />
        }
        onClose={() => setShouldShowDeleteAlert(false)}
        onSubmit={handleOnAlertSubmit}
      />
    </div>
  );
});

MovieHistoryItems.displayName = "MovieHistoryItems";

export default MovieHistoryItems;
