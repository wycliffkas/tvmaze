import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "./index.css";
import "./assets/css/loader.css";
import "./assets/css/style.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import movieReducer from "./store/reducers/movie";
import userReducer from "./store/reducers/user";

const rootReducer = combineReducers({
  movies: movieReducer,
  user: userReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
