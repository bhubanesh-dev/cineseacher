import React, { useState } from "react";

import classNames from "classnames";
import { Delete } from "neetoicons";
import { Typography, Alert, Button } from "neetoui";
import { useTranslation, Trans } from "react-i18next";
import useMovieViewStore from "stores/useMovieViewStore";

const ViewMovieHistoryItems = ({ movie: { imdbID, title }, id }) => {
  const { removeMovies, currentActiveMovieID } = useMovieViewStore.pick();

  const { t } = useTranslation();

  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);

  const handleOnAlertSubmit = () => {
    removeMovies(imdbID);
    setShouldShowDeleteAlert(false);
  };

  return (
    <div
      id={id}
      className={classNames(
        "mx-8 flex h-12 flex-row items-center justify-between rounded-xl border px-6 py-2 ",
        currentActiveMovieID === imdbID
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
};

export default ViewMovieHistoryItems;
