import { Tag } from "neetoui";

import formatGenresCollection from "./utils/formatGenresCollection";

const GenreTags = ({ genre }) => {
  if (!genre) return null;

  const tags = formatGenresCollection(genre);

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(genreItem => (
        <Tag className="px-2 py-1" key={genreItem} type="solid">
          {genreItem}
        </Tag>
      ))}
    </div>
  );
};

export default GenreTags;
