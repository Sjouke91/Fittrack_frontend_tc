import axios from "axios";
import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import { selectToken } from "../user/selectors";
import {
  GET_WORKOUT_EXERCISES,
  ExerciseActionTypes,
  ExerciseState,
  ExercisesWithWorkout,
  Exercise,
  ExerciseSubmit,
} from "./types";
import { Action } from "redux";
import { RootState } from "../rootReducer";
import { ThunkAction } from "redux-thunk";

export const getExercises = (
  workoutId: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch(appLoading);
  try {
    const res = await axios.get(`${apiUrl}/exercises/${workoutId}`);
    const exercises = res.data;
    dispatch(exercise(exercises));
    dispatch(appDoneLoading);
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

export const submitExercise = ({
  workoutId,
  id,
  reps,
  sets,
  kg,
  RPE,
}: ExerciseSubmit): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  console.log("got run", id);
  const token = selectToken(getState());
  dispatch(appLoading);
  try {
    await axios.post(
      `${apiUrl}/exercises/${id}`,
      {
        workoutId,
        reps,
        sets,
        kg,
        RPE,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(appDoneLoading);
    dispatch(showMessageWithTimeout("success", true, "exercise logged", 2000));
  } catch (e) {
    console.log(e);
    dispatch(
      showMessageWithTimeout("danger", true, e.response.data.message, 2000)
    );
  }
};

const exercise = (exercises: ExerciseActionTypes) => {
  return { type: GET_WORKOUT_EXERCISES, payload: exercises };
};
