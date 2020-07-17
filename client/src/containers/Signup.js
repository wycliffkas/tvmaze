import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../assets/images/logo.png";
import * as actions from "../store/actions/index";
import { Link } from "react-router-dom";

class Signup extends Component {

  state = {
    name: "",
    password: "",
    username: "",
  };
  
  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  handleSaveUser = (event) => {
    event.preventDefault();
    const userDetails = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
    };
    this.props.saveUser(userDetails);
    this.setState({
      username: "",
      password: "",
      name: "",
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
                    <h5 className="text-dark-10 text-center mt-0">Sign Up</h5>
                    <p className="text-muted mb-4">Create your account</p>
                  </div>
                  <form>
                    <div className="form-group">
                      <label htmlFor="email">Fullname</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
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
                        onClick={this.handleSaveUser}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p>
                    Already have an account?
                    <Link to="/" className="ml-1">
                      <b>Login</b>
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
    saveUser: (details) => dispatch(actions.registerUser(details)),
  };
};

export default connect(null, mapDispatchToProps)(Signup);
