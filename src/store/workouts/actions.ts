import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";
import { selectUser, selectToken } from "../user/selectors";
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
    const workoutArray: Workout[] = res.data;
    dispatch(workoutToState(workoutArray));
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

export const createWorkout = (
  workoutName: string,
  exerciseArray: number[]
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch(appLoading);
  const token = selectToken(getState());

  try {
    const res = await axios.post(
      `${apiUrl}/workouts`,
      { workoutName, exerciseArray },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(appDoneLoading);
    const workoutArray: Workout[] = res.data;
    dispatch(workoutToState(workoutArray));
    dispatch(showMessageWithTimeout("success", false, "Workout added!", 3000));
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};
