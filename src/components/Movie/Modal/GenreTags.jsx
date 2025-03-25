import { Tag } from "neetoui";

import genresCollection from "./utils/genresCollection";

const GenreTags = ({ genre }) => {
  if (!genre) return null;

  const tags = genresCollection(genre); //generate genres collection

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
