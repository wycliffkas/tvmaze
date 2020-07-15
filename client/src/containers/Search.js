import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import searchMovies from "../utils/searchMovies";

class Search extends Component {
  state = {
    query: "",
    term: "",
    moviesDb: [],
  };

  onChangeTerm = (event) => {
    this.setState({
      term: event.target.value,
    });
  };

  onChangeQuery = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  onSubmitSearch = (event) => {
    event.preventDefault();
    const searchResults = searchMovies(
      this.props.moviesDb,
      this.state.query,
      this.state.term
    );
    this.props.onUpdateMovieResults(searchResults);
  };

  render() {
    return (
      <div>
        <form>
          <div className="input-group">
            <div className="input-group-prepend">
              <select
                className="custom-select"
                id="inputGroupSelect01"
                onChange={this.onChangeTerm}
              >
                <option selected>All</option>
                <option value="name">Name</option>
                <option value="genre">Genre</option>
                <option value="rating">Rating</option>
                <option value="date">Date</option>
                <option value="status">Status</option>
              </select>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Search input with dropdown button"
              name="query"
              onChange={this.onChangeQuery}
              value={this.state.query}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={this.onSubmitSearch}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies,
    moviesDb: state.movies.moviesDb,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateMovieResults: (movies) =>
      dispatch(actions.updateMovieResults(movies)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
