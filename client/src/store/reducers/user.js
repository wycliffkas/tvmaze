import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: null,
  isAuth: false,
  token: null,
  userId: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.createdUser,
      };
    case actionTypes.FETCH_MOVIES_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: action.token,
        userId: action.userId,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isAuth: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default user;
