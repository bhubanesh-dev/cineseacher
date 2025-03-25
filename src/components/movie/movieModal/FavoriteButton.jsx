import { Rating, RatingFilled } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";

const FavoriteButton = ({ isFavorite, onToggle }) => {
  const { t } = useTranslation();

  return (
    <Button
      className="ml-4"
      icon={isFavorite ? RatingFilled : Rating}
      style="text"
      tooltipProps={{
        content: isFavorite ? t("removeFromFavorite") : t("addToFavorite"),
        position: "right-end",
      }}
      onClick={onToggle}
    />
  );
};

export default FavoriteButton;
