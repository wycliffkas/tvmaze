import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Search from "../containers/Search";
import history from "../utils/history";

const Header = () => {
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    history.push("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="logo" width="120" height="30" />
          </NavLink>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact={true}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/watchlist">
                Watch List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favourite">
                Favourite
              </NavLink>
            </li>
          </ul>
          <Search />
          <ul className="navbar-nav mr-2  ml-3 mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link header-link"
                to="/"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
