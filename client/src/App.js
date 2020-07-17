import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Router } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import Movie from "./containers/Movie";
import WatchList from "./containers/WatchList";
import NotFound from "./common/NotFound";
import Favourite from "./containers/Favourite";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import history from "./utils/history";
import { PrivateRoute } from "./common/PrivateRoute";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <ToastContainer />
        <Switch>
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/watchlist" component={WatchList} />
          <PrivateRoute path="/favourite" component={Favourite} />
          <PrivateRoute path="/movies" component={Movie} />
          <Route exact path="/" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
