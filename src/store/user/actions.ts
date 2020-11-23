// import { apiUrl } from "../../config/constants";
// import axios from "axios";
// import { selectToken } from "./selectors";
// import {
//   appLoading,
//   appDoneLoading,
//   showMessageWithTimeout,
//   setMessage,
// } from "../appState/actions";
// import {
//   UserActionTypes,
//   LOGIN_SUCCESS,
//   TOKEN_STILL_VALID,
//   LOG_OUT,
// } from "./types";
// import { Action } from "redux";
// import { RootState } from "../rootReducer";
// import { ThunkAction } from "redux-thunk";

// const loginSuccess = (userWithToken: UserActionTypes) => {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: userWithToken,
//   };
// };

// const tokenStillValid = (userWithoutToken: UserActionTypes) => ({
//   type: TOKEN_STILL_VALID,
//   payload: userWithoutToken,
// });

// export const logOut = () => ({ type: LOG_OUT });

// export const signUp = (
//   name: string,
//   email: string,
//   password: string
// ): ThunkAction<void, RootState, unknown, Action<string>> => {
//   return async (dispatch) => {
//     dispatch(appLoading());
//     try {
//       const response = await axios.post(`${apiUrl}/signup`, {
//         name,
//         email,
//         password,
//       });

//       dispatch(loginSuccess(response.data));
//       dispatch(
//         showMessageWithTimeout("success", true, "account created", 3000)
//       );
//       dispatch(appDoneLoading());
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.data.message);
//         dispatch(setMessage("danger", true, error.response.data.message));
//       } else {
//         console.log(error.message);
//         dispatch(setMessage("danger", true, error.message));
//       }
//       dispatch(appDoneLoading());
//     }
//   };
// };

// export const login = (
//   email: string,
//   password: string
// ): ThunkAction<void, RootState, unknown, Action<string>> => {
//   return async (dispatch) => {
//     dispatch(appLoading());
//     try {
//       const response = await axios.post(`${apiUrl}/login`, {
//         email,
//         password,
//       });

//       dispatch(loginSuccess(response.data));
//       dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
//       dispatch(appDoneLoading());
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.data.message);
//         dispatch(setMessage("danger", true, error.response.data.message));
//       } else {
//         console.log(error.message);
//         dispatch(setMessage("danger", true, error.message));
//       }
//       dispatch(appDoneLoading());
//     }
//   };
// };

// export const getUserWithStoredToken = (): ThunkAction<
//   void,
//   RootState,
//   unknown,
//   Action<string>
// > => {
//   return async (dispatch, getState) => {
//     // get token from the state
//     const token = selectToken(getState());

//     // if we have no token, stop
//     if (token === null) return;

//     dispatch(appLoading());
//     try {
//       // if we do have a token,
//       // check wether it is still valid or if it is expired
//       const response = await axios.get(`${apiUrl}/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // token is still valid
//       dispatch(tokenStillValid(response.data));
//       dispatch(appDoneLoading());
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.message);
//       } else {
//         console.log(error);
//       }
//       // if we get a 4xx or 5xx response,
//       // get rid of the token by logging out
//       dispatch(logOut());
//       dispatch(appDoneLoading());
//     }
//   };
// };

import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import { UserActionTypes } from "./types";
import { Action } from "redux";
import { RootState } from "../rootReducer";
import { ThunkAction } from "redux-thunk";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken: UserActionTypes) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken: UserActionTypes) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (
  name: string,
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(
        showMessageWithTimeout("success", true, "account created", 2000)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};
