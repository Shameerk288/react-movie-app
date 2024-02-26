import { DisplayType } from "../routes/home";
import MovieCard from "./movie-card";

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  rating?: number;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated: boolean;
}

const ColoumnDisplay = (props: Props) => {
  const { data, displayType, isRated } = props;

  return (
    <>
      {data ? (
        <div className="row">
          {data.map((displayData) => (
            <div className="col-md-6 col-lg-4">
              <MovieCard
                key={displayData.id}
                data={displayData}
                displayType={displayType}
                isRated={isRated}
              />
            </div>
          ))}
        </div>
      ) : (
        <h2 className="mt-4">No Data</h2>
      )}
    </>
  );
};

export default ColoumnDisplay;
