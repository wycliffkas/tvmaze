import React from "react";

const MovieDetail = ({ movieData }) => {
  return (
    <React.Fragment>
      <div className="flex-container">
        <div className="column">
          <img
            src={movieData.imageUrl}
            className="modal-img card-img-top"
            alt={`${movieData.name} movie poster`}
          />
        </div>
        <div className="column bg-alt">
          <p>
            <strong>Title: </strong>
            {movieData.name}
          </p>
          <p>
            <strong>Seasons: </strong>
            {movieData.seasons.length}
          </p>

          <p>
            <strong>Genre: </strong>
            {movieData.genre.join()}
          </p>

          <p>
            <strong>Rating: </strong>
            {movieData.rating}
          </p>

          <p>
            <strong>Premiered: </strong>
            {movieData.premiered}
          </p>

          <p>
            <strong>Status: </strong>
            {movieData.status}
          </p>

          <p>
            <strong>Crew:</strong>
          </p>
          <p>
            {movieData.crew
              .reduce((prev, next) => prev + next.person.name + ", ", "")
              .substring(0, 200) + "..."}
          </p>
        </div>
      </div>
      <div>
        <p>
          <strong>Description:</strong>
        </p>
        <p>
          {movieData.summary.replace(/(<([^>]+)>)/gi, "").substring(0, 250) +
            "..."}
        </p>
      </div>
    </React.Fragment>
  );
};

export default MovieDetail;
