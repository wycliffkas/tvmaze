import React, { Component } from "react";
import MovieList from "../components/MovieList";
import Loader from "../common/Loader";
import Header from "../components/Header";

class Favourite extends Component {
  
  state = {
    favourite: [],
  };

  componentDidMount() {
    const favouriteList = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );

    this.setState({ favourite: favouriteList });
  }

  render() {
    let movies = <Loader />;
    if (this.state.favourite.length === 0) {
      movies = (
        <div className="header">
          <h5>No movies added</h5>
        </div>
      );
    } else {
      movies = this.state.favourite.map((movie, i) => (
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
export default Favourite;
