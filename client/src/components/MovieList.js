import React from "react";

const MovieList = ({ movie }) => {
  return (
    <div className="col s4" style={{ margin: "20px 0" }}>
      <div className="card" style={{ textAlign: "center" }}>
        <div style={{ margin: "auto" }}>
          <img src={movie.imageUrl} alt={`${movie.name} movie poster`} />
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">{movie.name}</li>
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
