import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieItem from "../components/MovieItem";
import Loader from "../common/Loader";
import * as actions from "../store/actions/index";
import MovieDetail from "../components/MovieDetail";
import { addToFavourites, addToWatchList } from "../utils/addToList";
import Header from "../components/Header";

class Movie extends Component {
  
  state = {
    isOpen: false,
  };

  componentDidMount() {
    this.props.onFetchMovies();
  }

  hideModal = () => {
    this.setState({
      isOpen: false,
    });
    this.props.onClearMovieDetails();
  };

  fetchMovieDetails = (
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
    this.setState({
      isOpen: true,
    });
    this.props.onFetchMovieDetails(
      id,
      name,
      summary,
      imageUrlMedium,
      imageUrlOriginal,
      genre,
      rating,
      premiered,
      status
    );
  };

  render() {
    let movies = <Loader />;
    if (!this.props.loading) {
      if (this.props.movies.length === 0) {
        movies = (
          <div className="header">
            <h5>No matches found</h5>
          </div>
        );
      } else {
        movies = this.props.movies.map((movie, i) => (
          <div key={i}>
            <MovieItem movie={movie} onFetchDetails={this.fetchMovieDetails} />
          </div>
        ));
      }
    }

    let movieDetails = <Loader />;
    if (!this.props.loadingDetails) {
      movieDetails = <MovieDetail movieData={this.props.movieDetails} />;
    }
    return (
      <>
        <Header />
        <div className="row no-gutters justify-content-center">
          {movies}
          <Modal show={this.state.isOpen} onHide={this.hideModal} size="lg">
            <Modal.Body>{movieDetails}</Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => addToWatchList(this.props.movieDetails)}
                className="btn btn-primary"
              >
                Add to Watch List
              </button>
              <button
                onClick={() => addToFavourites(this.props.movieDetails)}
                className="btn btn-primary"
              >
                Add to Favourite
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies,
    loading: state.movies.loading,
    movieDetails: state.movies.selectedMovie,
    loadingDetails: state.movies.loadingDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMovies: () => dispatch(actions.fetchMovies()),
    onFetchMovieDetails: (
      id,
      name,
      summary,
      imageUrlMedium,
      imageUrlOriginal,
      genre,
      rating,
      premiered,
      status
    ) =>
      dispatch(
        actions.fetchMovieDetails(
          id,
          name,
          summary,
          imageUrlMedium,
          imageUrlOriginal,
          genre,
          rating,
          premiered,
          status
        )
      ),
    onClearMovieDetails: () => dispatch(actions.clearMovieDetails()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
