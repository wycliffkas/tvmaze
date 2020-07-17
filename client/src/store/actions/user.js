import * as actionTypes from "./actionTypes";
import axios from "axios";
import { toast } from "react-toastify";
import history from "../../utils/history";

export const registerUser = (userDetails) => {
  return (dispatch) => {
    const graphqlQuery = {
      query: `
      mutation {
        createUser(userInput: {username:"${userDetails.username}", name:"${userDetails.name}", password:"${userDetails.password}"}) {
          _id
          username
        }
      }
      `,
    };
    axios({
      method: "post",
      url: "http://localhost:5000/graphql",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.data;
      })
      .then((resData) => {
        if (resData.errors && resData.errors[0].status === 422) {
          toast.error(
            "Validation failed. Make sure the username isn't used yet!"
          );
          throw new Error(
            "Validation failed. Make sure the username isn't used yet!"
          );
        }
        if (resData.errors) {
          toast.error("User creation failed!");
          throw new Error("User creation failed!");
        }
        toast.success("User has been successfully registered");
      })
      .catch((errors) => {
        toast.error(
          "Validation failed. Make sure the username isn't used yet!"
        );
        dispatch(registerUserFail(errors));
      });
  };
};

export const registerUserFail = (error) => {
  return {
    type: actionTypes.REGISTER_USER_FAIL,
    error: error,
  };
};

export const loginUser = (userDetails) => {
  return (dispatch) => {
    const graphqlQuery = {
      query: `
        {
          login(username: "${userDetails.username}", password: "${userDetails.password}") {
            token
            userId
          }
        }
      `,
    };
    axios({
      method: "POST",
      url: "http://localhost:5000/graphql",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.data;
      })
      .then((resData) => {
        if (resData.errors && resData.errors[0].status === 422) {
          toast.error("User login failed, check password or username");
          throw new Error(
            "Validation failed. Make sure the username isn't used yet!"
          );
        }
        if (resData.errors) {
          toast.error("User login failed, check password or username");
          throw new Error("User login failed!");
        }

        localStorage.setItem("token", resData.data.login.token);
        localStorage.setItem("userId", resData.data.login.userId);

        dispatch(
          loginUserSuccess(resData.data.login.token, resData.data.login.userId)
        );
        history.push("/movies");
      })
      .catch((errors) => {
        toast.error("User login failed, check password or username");
        dispatch(loginUserFail(errors));
      });
  };
};

export const loginUserSuccess = (token, userId) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token,
    userId,
  };
};

export const loginUserFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error,
  };
};
