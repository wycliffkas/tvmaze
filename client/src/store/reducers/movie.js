import * as actionTypes from "../actions/actionTypes";

const initialState = {
  movies: [],
  moviesDb: [],
  loading: true,
  loadingDetails: false,
  selectedMovie: {
    id: "",
    name: "",
    summary: "",
    imageUrlMedium: "",
    imageUrlOriginal: "",
    genre: [],
    rating: "",
    premiered: "",
    status: "",
    crew: [],
    seasons: [],
  },
};

const movie = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.movieResults,
        moviesDb: action.movieResults,
      };
    case actionTypes.FETCH_MOVIES_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_MOVIE_DETAILS_START:
      return {
        ...state,
        loadingDetails: true,
      };
    case actionTypes.FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        selectedMovie: {
          id: action.id,
          name: action.name,
          summary: action.summary,
          imageUrl: action.imageUrl,
          imageUrlMedium: action.imageUrlMedium,
          imageUrlOriginal: action.imageUrlOriginal,
          genre: action.genre,
          rating: action.rating,
          premiered: action.premiered,
          status: action.status,
          crew: action.crewData,
          seasons: action.seasonsData,
        },
        loadingDetails: false,
      };
    case actionTypes.FETCH_MOVIE_DETAILS_FAIL:
      return {
        ...state,
        loadingDetails: false,
      };
    case actionTypes.CLEAR_MOVIE_DETAILS:
      return {
        ...state,
        selectedMovie: {
          id: "",
          name: "",
          summary: "",
          imageUrlMedium: "",
          imageUrlOriginal: "",
          genre: [],
          rating: "",
          premiered: "",
          status: "",
          crew: [],
          seasons: [],
        },
      };
    case actionTypes.UPDATE_MOVIE_RESULTS:
      return {
        ...state,
        movies: action.moviesData,
      };
    default:
      return state;
  }
};

export default movie;
