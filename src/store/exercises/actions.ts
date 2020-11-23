import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../appState/actions";
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
  const token = selectToken(getState());
  dispatch(appLoading);
  try {
    await axios.post(
      `${apiUrl}/exercises/${id}`,
      {
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
  } catch (e) {
    console.log(e.message);
  }
};

const exercise = (exercises: ExerciseActionTypes) => {
  return { type: GET_WORKOUT_EXERCISES, payload: exercises };
};
