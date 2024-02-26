import { useState } from "react";
import { DisplayType } from "./home";
import ColoumnDisplay from "../components/coloumn-display";
import { useQuery } from "@tanstack/react-query";
import { getRatedMovies, getRatedTvShows } from "../components/query";
import { Navigate } from "react-router-dom";

const Rated = () => {
  const [displayType, setDispalyType] = useState<DisplayType>(
    DisplayType.Movies
  );

  const { data: ratedMovies, isLoading: loadingRatedMovies } = useQuery({
    queryKey: ["ratedMovies"],
    queryFn: getRatedMovies,
  });

  if (localStorage.getItem("guest_session_id") === null) {
    return <Navigate to={"/login"} />;
  }

  const { data: ratedTvShows, isLoading: loadingRatedTvShows } = useQuery({
    queryKey: ["ratedTvShows"],
    queryFn: getRatedTvShows,
  });

  return (
    <div className="mt-4">
      <button
        className={`btn m-2 ${
          displayType === DisplayType.Movies ? "btn-success" : ""
        }`}
        onClick={() => setDispalyType(DisplayType.Movies)}
      >
        Movies
      </button>
      <button
        className={`btn m-2 ${
          displayType === DisplayType.TvShows ? "btn-success" : ""
        }`}
        onClick={() => setDispalyType(DisplayType.TvShows)}
      >
        TV Shows
      </button>

      <div>
        {loadingRatedMovies || loadingRatedTvShows ? (
          <div
            className="spinner-border mt-5"
            role="status"
            style={{ height: "4rem", width: "4rem" }}
          ></div>
        ) : (
          <div>
            {displayType === DisplayType.Movies ? (
              <ColoumnDisplay
                data={ratedMovies.results}
                displayType={DisplayType.Movies}
                isRated
              />
            ) : (
              <ColoumnDisplay
                data={ratedTvShows.results}
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

export default Rated;
