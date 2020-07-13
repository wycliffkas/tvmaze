import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieItem from "../components/MovieItem";
import Loader from "../common/Loader";

class Movie extends Component {
  state = {
    movies: [],
    loading: true,
    loadingDetails: false,
    isOpen: false,
    selectedMovie: {
      id: "",
      name: "",
      summary: "",
      imageUrl: "",
      crew: [],
      seasons: [],
    },
  };

  componentDidMount() {
    const graphqlQuery = {
      query: `
          {  getShows {
            id,
            name,
            image {
              medium,
              original
            },
            summary
          }}
            `,
    };
    axios({
      method: "post",
      url: "http://localhost:5000/graphql",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.data;
      })
      .then((resData) => {
        this.setState({
          ...this.state,
          movies: resData.data.getShows,
          loading: false,
        });
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  hideModal = () => {
    this.setState({
      isOpen: false,
      selectedMovie: {
        id: "",
        name: "",
        summary: "",
        imageUrl: "",
        crew: [],
        seasons: [],
      },
    });
  };

  fetchMovieDetails = (id, name, summary, imageUrl) => {
    this.setState({
      isOpen: true,
      loadingDetails: true,
    });

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
      url: "http://localhost:5000/graphql",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(graphqlQueryCrew),
    });

    const requestSeasons = axios({
      method: "post",
      url: "http://localhost:5000/graphql",
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
          this.setState({
            ...this.state,
            selectedMovie: {
              id: id,
              name: name,
              summary: summary,
              imageUrl: imageUrl,
              crew: responseTwo.data.getCrew,
              seasons: responseOne.data.getSeasons,
            },
            loadingDetails: false,
          });
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  };

  render() {
    let movies = <Loader />;
    if (!this.state.loading) {
      movies = this.state.movies.map((movie, i) => (
        <div key={i}>
          <MovieItem movie={movie} onFetchDetails={this.fetchMovieDetails} />
        </div>
      ));
    }

    let movieDetails = <Loader />;
    if (!this.state.loadingDetails) {
      movieDetails = (
        <React.Fragment>
          <div className="flex-container">
            <div className="column">
              <img
                src={this.state.selectedMovie.imageUrl}
                className="modal-img card-img-top"
                alt={`${this.state.selectedMovie.name} movie poster`}
              />
            </div>
            <div className="column bg-alt">
              <p>
                <strong>Title: </strong>
                {this.state.selectedMovie.name}
              </p>
              <p>
                <strong>Seasons: </strong>
                {this.state.selectedMovie.seasons.length}
              </p>
              <p>
                <strong>Crew:</strong>
              </p>
              <p>
                {this.state.selectedMovie.crew
                  .reduce((prev, next) => prev + next.person.name + ", ", "")
                  .substring(0, 300) + "..."}
              </p>
            </div>
          </div>
          <div>
            <p>
              <strong>Description:</strong>
            </p>
            <p>
              {this.state.selectedMovie.summary
                .replace(/(<([^>]+)>)/gi, "")
                .substring(0, 250) + "..."}
            </p>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className="row no-gutters justify-content-center">
        {movies}
        <Modal show={this.state.isOpen} onHide={this.hideModal} size="lg">
          <Modal.Body>{movieDetails}</Modal.Body>
          <Modal.Footer>
          <button>Add to Watch List</button>
          <button>Add to Favourite</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Movie;
