import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Movie from "./containers/Movie";
import WatchList from "./containers/WatchList";
import Header from "./components/Header";
import NotFound from "./common/NotFound";
import Favourite from "./containers/Favourite";
const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <ToastContainer />
        <Switch>
          <Route path="/watchlist" component={WatchList} />
          <Route path="/favourite" component={Favourite} />
          <Route exact path="/" component={Movie} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
