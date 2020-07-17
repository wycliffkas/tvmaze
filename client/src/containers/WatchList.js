import React, { Component } from "react";
import MovieList from "../components/MovieList";
import Loader from "../common/Loader";
import Header from "../components/Header";

class WatchList extends Component {

  state = {
    watchList: [],
  };

  componentDidMount() {
    const moviesWatchList = JSON.parse(
      localStorage.getItem("watchList") || "[]"
    );

    this.setState({ watchList: moviesWatchList });
  }
  
  render() {
    let movies = <Loader />;
    if (this.state.watchList.length === 0) {
      movies = (
        <div className="header">
          <h5>No movies added</h5>
        </div>
      );
    } else {
      movies = this.state.watchList.map((movie, i) => (
        <div key={i}>
          <MovieList movie={movie} />
        </div>
      ));
    }
    return (
      <>
        <Header />
        <div className="row no-gutters justify-content-center">{movies}</div>
      </>
    );
  }
}
export default WatchList;
