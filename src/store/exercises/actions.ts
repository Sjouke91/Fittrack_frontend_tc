import axios from "axios";
import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";
import { selectToken } from "../user/selectors";
import {
  GET_ALL_EXERCISES,
  GET_WORKOUT_EXERCISES,
  GET_LOGGED_EXERCISES,
  GET_EXERCISES_BY_SEARCH,
  EMPTY_SEARCHED_EXERCISES,
  DELETE_EXERCISE,
  ADD_EXERCISES_TO_WORKOUT,
  ExerciseActionTypes,
  ExercisesWithWorkout,
  Exercise,
  ExerciseSubmit,
  loggedExercise,
} from "./types";
import { Action } from "redux";
import { RootState } from "../rootReducer";
import { ThunkAction } from "redux-thunk";
import { AddExBySearch } from "../workouts/types";

export const getAllExercises = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const res = await axios.get(`${apiUrl}/exercises`);
    const exercises = res.data;
    dispatch(allExercisesSucces(exercises));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

export const getLoggedExercises = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  const token = selectToken(getState());

  if (token === null) return;

  dispatch(appLoading());
  try {
    const res = await axios.get(`${apiUrl}/exercises/logged`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const exercises = res.data;
    dispatch(allExerciseOfUserSucces(exercises));
    dispatch(appDoneLoading());
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
  dispatch(appLoading());
  try {
    const res = await axios.get(
      `${apiUrl}/exercises/search?muscleGroupId=${muscleGroupId}&exerciseName=${exerciseName}`
    );
    const exercises = res.data;
    dispatch(exerciseSearchSucces(exercises));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log("ERROR:", e.message);
    dispatch(
      showMessageWithTimeout("danger", true, e.response.data.message, 3000)
    );
  }
};

export const getWorkoutExercises = (
  workoutId: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch(appLoading());
  try {
    const res = await axios.get(`${apiUrl}/exercises/${workoutId}`);
    const exercises = res.data;
    dispatch(workoutExerciseSucces(exercises));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

export const submitExercise = ({
  workoutStart,
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
  const token = selectToken(getState());
  dispatch(appLoading());

  try {
    await axios.post(
      `${apiUrl}/exercises/${id}`,
      {
        workoutStart,
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
    dispatch(appDoneLoading());
    dispatch(showMessageWithTimeout("warning", true, "exercise logged", 2000));
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

const exerciseSearchSucces = (exercises: Exercise[]): ExerciseActionTypes => {
  return { type: GET_EXERCISES_BY_SEARCH, payload: exercises };
};

const allExerciseOfUserSucces = (
  exercises: loggedExercise[]
): ExerciseActionTypes => {
  return { type: GET_LOGGED_EXERCISES, payload: exercises };
};

const allExercisesSucces = (exercises: Exercise[]): ExerciseActionTypes => {
  return { type: GET_ALL_EXERCISES, payload: exercises };
};

export const emptySearch = (): ExerciseActionTypes => {
  return { type: EMPTY_SEARCHED_EXERCISES };
};

export const addExercisesToWorkout = (
  exercises: AddExBySearch
): ExerciseActionTypes => {
  return { type: ADD_EXERCISES_TO_WORKOUT, payload: exercises };
};

// export const deleteExerciseSucces = (
//   exerciseId: number
// ): ExerciseActionTypes => {
//   console.log("got run");
//   return { type: DELETE_EXERCISE, payload: exerciseId };
// };
