import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchMovies = () => {
  return (dispatch) => {
    const graphqlQuery = {
      query: `
        {  getShows {
            id,
            name,
            image {
            medium,
            original
            },
            summary,
            genres,
            rating {
              average
            },
            premiered,
            status
        }}`,
    };
    axios({
      method: "post",
      url: "http://localhost:8080/graphql",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.data;
      })
      .then((resData) => {
        dispatch(fetchMoviesSuccess(resData.data.getShows));
      })
      .catch((errors) => {
        dispatch(fetchMoviesFail(errors));
      });
  };
};

export const fetchMoviesSuccess = (movieResults) => {
  return {
    type: actionTypes.FETCH_MOVIES_SUCCESS,
    movieResults: movieResults,
  };
};

export const fetchMoviesFail = (error) => {
  return {
    type: actionTypes.FETCH_MOVIES_FAIL,
    error: error,
  };
};

export const fetchMovieDetails = (
  id,
  name,
  summary,
  imageUrlMedium,
  imageUrlOriginal,
  genre,
  rating,
  premiered,
  status
) => {
  return (dispatch) => {
    dispatch(fetchMovieDetailsStart());
    const graphqlQueryCrew = {
      query: `
      {
        getCrew(userInput:{movie_id:${id}}){
          person {
            name
          }
        }
      }
      `,
    };

    const graphqlQuerySeason = {
      query: `
      {
        getSeasons(userInput:{movie_id:${id}}){
          number
        }
      }
      `,
    };

    const requestCrew = axios({
      method: "post",
      url: "http://localhost:8080/graphql",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(graphqlQueryCrew),
    });

    const requestSeasons = axios({
      method: "post",
      url: "http://localhost:8080/graphql",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(graphqlQuerySeason),
    });
    axios
      .all([requestSeasons, requestCrew])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0].data;
          const responseTwo = responses[1].data;
          dispatch(
            fetchMovieDetailsSuccess(
              id,
              name,
              summary,
              imageUrlMedium,
              imageUrlOriginal,
              genre,
              rating,
              premiered,
              status,
              responseTwo.data.getCrew,
              responseOne.data.getSeasons
            )
          );
        })
      )
      .catch((errors) => {
        dispatch(fetchMovieDetailsFail(errors));
      });
  };
};

export const fetchMovieDetailsStart = () => {
  return {
    type: actionTypes.FETCH_MOVIE_DETAILS_START,
  };
};

export const clearMovieDetails = () => {
  return {
    type: actionTypes.CLEAR_MOVIE_DETAILS,
  };
};

export const fetchMovieDetailsSuccess = (
  id,
  name,
  summary,
  imageUrlMedium,
  imageUrlOriginal,
  genre,
  rating,
  premiered,
  status,
  crew,
  seasons
) => {
  return {
    type: actionTypes.FETCH_MOVIE_DETAILS_SUCCESS,
    id,
    name,
    summary,
    imageUrlMedium,
    imageUrlOriginal,
    genre,
    rating,
    premiered,
    status,
    crewData: crew,
    seasonsData: seasons,
  };
};

export const fetchMovieDetailsFail = (error) => {
  return {
    type: actionTypes.FETCH_MOVIE_DETAILS_FAIL,
    error: error,
  };
};

export const updateMovieResults = (movies) => {
  return {
    type: actionTypes.UPDATE_MOVIE_RESULTS,
    moviesData: movies,
  };
};
