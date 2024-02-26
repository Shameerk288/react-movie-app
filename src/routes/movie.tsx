import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, useNavigate, useParams } from "react-router-dom";
import { fetchMovie } from "../components/query";
import { useState } from "react";
import { rateMovie } from "../components/mutation";

const Movie = () => {
  const { id } = useParams<string>();
  const [rating, setRating] = useState<number>(0);

  // If no id or id is invalid
  if (!id) {
    return <div>Invalid Movie ID</div>;
  }

  const navigate = useNavigate();

  // useQuery function to get the data from API
  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovie(id),
  });

  // useMutation function to alter the data
  const { mutate: rateMovieMutation, isSuccess } = useMutation({
    mutationKey: ["movieRating"],
    mutationFn: (id: number) => rateMovie(id, rating),
  });

  // Checking if the data is in loading state
  if (isLoading) {
    return (
      <div>
        <div
          className="spinner-border mt-5"
          role="status"
          style={{ height: "4rem", width: "4rem" }}
        ></div>
      </div>
    );
  }

  if (isSuccess) {
    navigate("/");
  }

  return (
    <div className="row" style={{ textAlign: "left" }}>
      <h2
        className="card-title my-4"
        style={{ textAlign: "center", fontWeight: "bold" }}
      >
        {data.original_title}
      </h2>

      <div className="col-md-6 mb-2">
        <img
          className="card-img"
          src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
          alt="Card image cap"
          height="600px"
        />
      </div>
      <div className="col-md-5">
        <div className="my-2" style={{ fontSize: "14px" }}>
          <b>Is the Movie For Adults: </b>
          <div>{data.adult === true ? "Yes" : "No"}</div>

          <b>Budget: </b>
          <div>{data.budget}</div>

          <b>Genres: </b>
          {data.genres.map((genre: any) => (
            <div key={genre.id}>{genre.name}</div>
          ))}

          <b>IMDB ID: </b>
          <div>{data.imdb_id}</div>

          <b>Popularity: </b>
          <div>{data.popularity}</div>

          <b>Release Date: </b>
          <div>{data.release_date}</div>

          <b>Revenue: </b>
          <div>{data.revenue}</div>

          <b>Production Companies: </b>
          <br />
          {data.production_companies
            .map((production_company: any) => `${production_company.name}`)
            .join(", ")}
          <br />

          <b>Runtime: </b>
          <div>{data.runtime}</div>

          <b>Vote Average: </b>
          <div>{data.vote_average}</div>

          <b>Language: </b>
          {data.spoken_languages.map((spoken_language: any) => (
            <div key={spoken_language.id}>{spoken_language.name}</div>
          ))}

          <b>Release Date: </b>
          <div>{data.release_date}</div>
        </div>
      </div>
      <div className="col-md-6 mt-4">
        <h2 style={{ fontWeight: "bold" }}>Description:</h2>
        <p style={{ textAlign: "justify" }}>{data.overview}</p>
      </div>
      <div className="col-md-6">
        <Form>
          <input
            type="number"
            min={0}
            max={10}
            step={0.5}
            className="form-control mt-4 mb-1"
            name="rating"
            id="rating"
            placeholder="0-10"
            onChange={(event) => setRating(Number(event.target.value))}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            onClick={() => rateMovieMutation(data.id)}
          >
            Add Rating
          </button>
        </Form>
      </div>
    </div>
  );
};

// export const createPostAction = async (data) => {
//   const formData = await data.request.formData();
//   const postData = Object.fromEntries(formData);
//   console.log(postData);
// };

export default Movie;
