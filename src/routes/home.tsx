import { useState } from "react";
import ColoumnDisplay from "../components/coloumn-display";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchTvShows } from "../components/query";
import { Navigate } from "react-router-dom";

export enum DisplayType {
  Movies = "movies",
  TvShows = "tvshows",
}
const Home = () => {
  const [displayType, setDispalyType] = useState<DisplayType>(
    DisplayType.Movies
  );

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const { data: TvShowData, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ["tvShows"],
    queryFn: fetchTvShows,
  });

  if (localStorage.getItem("guest_session_id") === null) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="mt-4">
      <button
        className={`btn m-2 ${displayType === "movies" ? "btn-primary" : ""}`}
        onClick={() => setDispalyType(DisplayType.Movies)}
      >
        Movies
      </button>
      <button
        className={`btn m-2 ${displayType === "tvshows" ? "btn-primary" : ""}`}
        onClick={() => setDispalyType(DisplayType.TvShows)}
      >
        TV Shows
      </button>

      <div>
        {isLoadingMovies || isLoadingTvShows ? (
          <div
            className="spinner-border mt-5"
            role="status"
            style={{ height: "4rem", width: "4rem" }}
          ></div>
        ) : (
          <div>
            {displayType === DisplayType.Movies ? (
              <ColoumnDisplay
                data={movieData.results}
                displayType={DisplayType.Movies}
                isRated
              />
            ) : (
              <ColoumnDisplay
                data={TvShowData.results}
                displayType={DisplayType.TvShows}
                isRated
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
