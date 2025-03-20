import { Button, Typography } from "neetoui";

const MovieListItem = ({ Title, Year, Poster }) => (
  <div className="flex h-auto w-64 flex-col rounded-lg border border-gray-200 bg-white px-6 pb-4 shadow-lg">
    <div className="mx-auto mb-4 w-[80%]">
      <img alt={Title} className="h-44 w-44 object-contain" src={Poster} />
    </div>
    <Typography className="mb-1 text-lg font-bold leading-5 text-gray-900">
      {Title}
    </Typography>
    <Typography className="mb-2 text-sm font-medium text-gray-600">
      Year • {Year}
    </Typography>
    <Button
      className="my-2  w-32 bg-gray-100 font-bold text-blue-500"
      label="View Details"
      size="medium"
      style="text"
    />
  </div>
);

export default MovieListItem;
