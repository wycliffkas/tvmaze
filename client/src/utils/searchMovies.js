import moment from "moment";
const searchMovies = (movies, query, term) => {
  const searchResults = movies.filter((movie) => {
    switch (term) {
      case "name":
        return movie.name.includes(
          query.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
        );
      case "rating":
        return movie.rating.average === parseInt(query);
      case "status":
        return movie.status.includes(
          query.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
        );
      case "date":
        if (moment(query, "DD-MM-YYYY", true).isValid()) {
          const formatedDate = moment(query, "DD-MM-YYYY").format("YYYY-MM-DD");
          return movie.premiered === formatedDate;
        }
        return movie.premiered === query;
      case "genre":
        console.log("genreeee")
        return movie.genres.includes(
          query.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
        );
      default:
        return movie;
    }
  });

  return searchResults;
};

export default searchMovies;
