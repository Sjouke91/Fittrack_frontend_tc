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
  GET_ALL_EXERCISES,
  GET_EXERCISES_BY_SEARCH,
  ExerciseActionTypes,
  ExerciseState,
  ExercisesWithWorkout,
  Exercise,
  ExerciseSubmit,
} from "./types";
import { Action } from "redux";
import { RootState } from "../rootReducer";
import { ThunkAction } from "redux-thunk";

export const getAllExercises = (
  offset: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch(appLoading);
  try {
    const res = await axios.get(
      `${apiUrl}/exercises?offset=${offset}&limit=50`
    );
    const exercises = res.data;
    dispatch(allExerciseSucces(exercises));
    dispatch(appDoneLoading);
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

export const getExercisesBySearch = (
  muscleGroupId: number | string,
  exerciseName: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  console.log("got run");
  dispatch(appLoading);
  try {
    const res = await axios.get(
      `${apiUrl}/exercises/search?muscleGroupId=${muscleGroupId}&exerciseName=${exerciseName}`
    );
    const exercises = res.data;
    dispatch(exerciseSearchSucces(exercises));
    dispatch(appDoneLoading);
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

export const getWorkoutExercises = (
  workoutId: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch(appLoading);
  try {
    const res = await axios.get(`${apiUrl}/exercises/${workoutId}`);
    const exercises = res.data;
    dispatch(workoutExerciseSucces(exercises));
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

const workoutExerciseSucces = (
  exercises: ExercisesWithWorkout[]
): ExerciseActionTypes => {
  return { type: GET_WORKOUT_EXERCISES, payload: exercises };
};

const allExerciseSucces = (exercises: Exercise[]): ExerciseActionTypes => {
  return { type: GET_ALL_EXERCISES, payload: exercises };
};

const exerciseSearchSucces = (exercises: Exercise[]): ExerciseActionTypes => {
  return { type: GET_EXERCISES_BY_SEARCH, payload: exercises };
};
