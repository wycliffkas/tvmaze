import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import * as actions from "../store/actions/index";

class Login extends Component {

  state = {
    password: "",
    username: "",
  };
  
  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  handleUserLogin = (event) => {
    event.preventDefault();
    const userDetails = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.onLoginUser(userDetails);
    this.setState({
      username: "",
      password: "",
    });
  };
  render() {
    return (
      <div className="account-pages  mb-5 big-margin">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card">
                <div className="card-header pt-4 pb-4 text-center bg-dark">
                  <span>
                    <img src={logo} alt="logo" width="120" height="30" />
                  </span>
                </div>
                <div className="card-body p-4">
                  <div className="text-center w-75 m-auto">
                    <h5 className="text-dark-10 text-center mt-0">Sign In</h5>
                  </div>
                  <form>
                    <div className="form-group">
                      <label htmlFor="email">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-0 text-center">
                      <button
                        className="btn btn-primary"
                        onClick={this.handleUserLogin}
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p>
                    Don't have an account?
                    <Link to="/signup" className="ml-1">
                      <b>Sign Up</b>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUser: (details) => dispatch(actions.loginUser(details)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
