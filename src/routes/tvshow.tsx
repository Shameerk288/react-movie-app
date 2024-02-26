import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, useNavigate, useParams } from "react-router-dom";
import { fetchTvShow } from "../components/query";
import { useState } from "react";
import { rateTvShow } from "../components/mutation";
import { Accordion } from "react-bootstrap";

const TvShow = () => {
  const { id } = useParams<string>();
  const [rating, setRating] = useState<number>(0);

  const navigate = useNavigate();

  if (!id) {
    return <div>Invalid TV Show ID</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchTvShow(id),
  });

  const { mutate: rateTvShowMutation, isSuccess } = useMutation({
    mutationKey: ["tvShowRating"],
    mutationFn: (id: number) => rateTvShow(id, rating),
  });

  if (isSuccess) {
    navigate("/");
  }

  return (
    <>
      {isLoading ? (
        <div
          className="spinner-border mt-5"
          role="status"
          style={{ height: "4rem", width: "4rem" }}
        ></div>
      ) : (
        <div className="row" style={{ textAlign: "left" }}>
          <h2
            className="card-title my-4"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            {data.name}
          </h2>

          <div className="col-md-5 mb-2">
            <img
              className="card-img"
              src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
              alt="Card image cap"
              height="600px"
            />
          </div>

          <div className="col-md-4">
            <div className="my-2" style={{ fontSize: "15px" }}>
              <b>Created By: </b>
              {data.created_by.map((creator: any) => (
                <div key={creator.id} className="mb-1">
                  {creator.name}
                </div>
              ))}

              <b>Episodes Runtime: </b>
              <div className="mb-1">{data.episode_run_time}</div>

              <b>Genres </b>
              {data.genres.map((genre: any) => (
                <div key={genre.id} className="mb-1">
                  {genre.name}
                </div>
              ))}

              <b>First Air Date: </b>
              <div className="mb-1">{data.first_air_date}</div>

              <b>Networks: </b>
              <br />
              {data.networks.map((network: any) => (
                <img
                  key={network.id}
                  src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                  height="20vh"
                  width="80vw"
                  className="mb-2"
                />
              ))}

              <br />
              <b>Production Companies: </b>
              <br />
              {data.production_companies
                .map((production_company: any) => `${production_company.name}`)
                .join(", ")}

              <br />

              <b>Number Of Episodes: </b>
              <div className="mb-1">{data.number_of_episodes}</div>

              <b>Number Of Seasons: </b>
              <div className="mb-1">{data.number_of_seasons}</div>

              <b>Vote Average: </b>
              <div className="mb-1">{data.vote_average}</div>

              <b>Language: </b>
              {data.spoken_languages.map((spoken_language: any) => (
                <div className="mb-1" key={spoken_language.id}>
                  {spoken_language.name}
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <b>Seasons: </b>
            <Accordion style={{ height: "550px", overflowY: "scroll" }}>
              {data.seasons.map((season: any) => (
                <div>
                  <Accordion.Item eventKey={season.id} style={{ padding: "0" }}>
                    <Accordion.Header>{season.name}</Accordion.Header>
                    <Accordion.Body>
                      <p>Release Date: {season.air_date}</p>
                      <p>Episodes: {season.episode_count}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              ))}
            </Accordion>
          </div>

          <div className="col-md-5 mt-4">
            <h2 style={{ fontWeight: "bold" }}>Description:</h2>
            <p style={{ textAlign: "justify" }}>{data.overview}</p>
          </div>
          <div className="col-md-7">
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
                onClick={() => rateTvShowMutation(data.id)}
              >
                Add Rating
              </button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default TvShow;
