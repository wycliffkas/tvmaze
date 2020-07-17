const axios = require("axios");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require('validator');

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
  createUser: async function ({ userInput }, req) {
    const errors = [];
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: "Password too short!" });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({ username: userInput.username });
    if (existingUser) {
      const error = new Error("User exists already!");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      username: userInput.username,
      name: userInput.name,
      password: hashedPw,
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  login: async function ({ username, password }) {
    const user = await User.findOne({ username: username });
    if (!user) {
      const error = new Error("User not found.");
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Password is incorrect.");
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { token: token, userId: user._id.toString() };
  },
};
