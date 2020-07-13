import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ movie, onFetchDetails }) => {
  return (
    <div className="col s4" style={{ margin: "20px 0" }}>
      <div
        className="card"
        style={{ textAlign: "center" }}
        onClick={() =>
          onFetchDetails(
            movie.id,
            movie.name,
            movie.summary,
            movie.image.original
          )
        }
      >
        <div style={{ margin: "auto" }}>
          <img src={movie.image.medium} alt={`${movie.name} movie poster`} />
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to="/">{movie.name}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MovieItem;
