const axios = require("axios");

module.exports = {
  getShows() {
    return axios
      .get("http://api.tvmaze.com/shows")
      .then((res) => res.data)
      .catch((errors) => {
        console.log(errors);
      });
  },
  getCrew({ userInput }, req) {
    return axios
      .get(`http://api.tvmaze.com/shows/${userInput.movie_id}/crew`)
      .then((res) => res.data)
      .catch((errors) => {
        console.log(errors);
      });
  },
  getSeasons({ userInput }, req) {
    return axios
      .get(`http://api.tvmaze.com/shows/${userInput.movie_id}/seasons`)
      .then((res) => res.data)
      .catch((errors) => {
        console.log(errors);
      });
  },
};
