import { Link, useLocation } from "react-router-dom";

const MovieCard = (props: any) => {
  const { data, displayType, isRated } = props;
  const location = useLocation();

  return (
    <>
      <Link
        to={`/${displayType === "movies" ? "movie" : "tvshow"}/${data.id}`}
        style={{ textDecoration: "none" }}
      >
        <div
          className="card my-3"
          style={{
            minHeight: "600px",
            height: "auto",
            textAlign: "left",
          }}
        >
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
            alt="Card image cap"
            height="350px"
          />
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: "bold" }}>
              {displayType === "movies" ? data.title : data.name}
            </h5>
            <p className="card-text" style={{ color: "#1999cd" }}>
              <b>Release Date: </b>
              {displayType === "movies"
                ? data.release_date
                : data.first_air_date}
              <b> | Rating: </b>
              {data.vote_average}
            </p>
            <p className="card-text">{data.overview.slice(0, 200)}...</p>
            {isRated && location.pathname === "/rated" ? (
              <p style={{ color: "green", fontWeight: "bold" }}>
                Your Rating: {data.rating}
              </p>
            ) : undefined}
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieCard;
