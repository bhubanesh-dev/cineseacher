import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const MovieListItem = ({ title, year, poster }) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-auto w-64 flex-col rounded-lg border border-gray-200 bg-white px-6 pb-4 shadow-lg">
      <div className="mx-auto mb-4 w-[80%]">
        <img
          alt={title}
          className="h-44 w-44 object-contain"
          src={poster === "N/A" ? t("fallbackImg") : poster}
        />
      </div>
      <Typography className="mb-2 text-lg font-bold leading-5 text-gray-900">
        {t("title", { title })}
      </Typography>
      <Typography className="mb-2 text-sm font-medium text-gray-600">
        {t("year", { year })}
      </Typography>
      <Button
        className="my-2  w-32 bg-gray-100 font-bold text-blue-500"
        label={t("viewDetails")}
        size="medium"
        style="text"
      />
    </div>
  );
};

export default MovieListItem;
