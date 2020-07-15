import { toast } from "react-toastify";

export const addToWatchList = (movieDetails) => {
  const moviesWatchList = JSON.parse(localStorage.getItem("watchList") || "[]");

  const movieToAdd = {
    id: movieDetails.id,
    name: movieDetails.name,
    imageUrl: movieDetails.imageUrlMedium,
  };

  const existance = moviesWatchList.some(
    (movie) => movie.id === movieDetails.id
  );
  if (!existance) {
    moviesWatchList.push(movieToAdd);
    localStorage.setItem("watchList", JSON.stringify(moviesWatchList));
    toast.success("Movie has been successfully added");
  }
};

export const addToFavourites = (movieDetails) => {
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

  const movieToAdd = {
    id: movieDetails.id,
    name: movieDetails.name,
    imageUrl: movieDetails.imageUrlMedium,
  };

  const existance = favourites.some((movie) => movie.id === movieDetails.id);
  if (!existance) {
    favourites.push(movieToAdd);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    toast.success("Movie has been successfully added");
  }
};
