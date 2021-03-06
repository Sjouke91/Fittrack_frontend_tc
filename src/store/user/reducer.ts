import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./types";
import { UserActionTypes } from "./types";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  id: null,
};

// eslint-disable-next-line
export default (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
