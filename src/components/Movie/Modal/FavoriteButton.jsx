import { Rating, RatingFilled } from "neetoicons";
import { Button } from "neetoui";
import { withT } from "utils/withT";

const FavoriteButton = ({ isFavorite, onToggle, t }) => (
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

export default withT(FavoriteButton);
