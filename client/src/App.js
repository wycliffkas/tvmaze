import React from "react";
import Movie from "./containers/Movie";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Movie} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
