import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading } from "../appState/actions";
import { selectUser } from "../user/selectors";
import { Action } from "redux";
import { RootState } from "../rootReducer";
import { ThunkAction } from "redux-thunk";
import { WorkoutActionTypes, Workout, GET_USERS_WORKOUTS } from "./types";

const workoutToState = (workoutArray: Workout[]): WorkoutActionTypes => {
  return { type: GET_USERS_WORKOUTS, payload: workoutArray };
};

export const getUsersWorkouts = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch(appLoading);
  const user = selectUser(getState());
  try {
    const res = await axios.get(`${apiUrl}/workouts/${user.id}`);
    dispatch(appDoneLoading);
    const workoutArray = res.data;
    dispatch(workoutToState(workoutArray));
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};
