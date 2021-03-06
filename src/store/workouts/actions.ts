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
import {
  WorkoutActionTypes,
  Workout,
  GET_USERS_WORKOUTS,
  ADD_USERS_WORKOUTS,
  WorkoutWithUser,
  AddExBySearch,
} from "./types";
import {
  getWorkoutExercises,
  addExercisesToWorkout,
} from "../exercises/actions";

const workoutToState = (workoutArray: Workout[]): WorkoutActionTypes => {
  return { type: GET_USERS_WORKOUTS, payload: workoutArray };
};

const addWorkoutToState = (workoutArray: Workout[]): WorkoutActionTypes => {
  return { type: ADD_USERS_WORKOUTS, payload: workoutArray };
};

//get all workouts of user
export const getUsersWorkouts = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch(appLoading());
  const user = selectUser(getState());
  try {
    const res = await axios.get(`${apiUrl}/workouts/${user.id}`);
    dispatch(appDoneLoading());
    const workoutArray: WorkoutWithUser[] = res.data;

    const cleanWorkoutArray = workoutArray.map((w) => {
      return w.workout;
    });
    dispatch(workoutToState(cleanWorkoutArray));
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

//create a new workout
export const createWorkout = (
  workoutName: string,
  exerciseArray: number[]
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch(appLoading());
  const token = selectToken(getState());

  try {
    const res = await axios.post(
      `${apiUrl}/workouts`,
      { workoutName, exerciseArray },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const newWorkout = res.data;
    dispatch(addWorkoutToState(newWorkout));
    dispatch(appDoneLoading());
    dispatch(showMessageWithTimeout("warning", false, "Workout added!", 3000));
  } catch (e) {
    console.log("ERROR:", e.message);
    dispatch(
      showMessageWithTimeout("danger", false, e.response.data.message, 3000)
    );
  }
};

// add exercise to workout
export const editWorkout = (
  workoutId: number,
  exerciseName: string,
  exerciseId: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch(appLoading);
  const token = selectToken(getState());

  try {
    const res = await axios.post(
      `${apiUrl}/workouts/${workoutId}`,
      { exerciseId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const response = res.data;

    const exerciseObject: AddExBySearch = {
      workoutId,
      exercise: { id: response.exerciseId, name: exerciseName },
    };

    console.log("this is ex", exerciseObject);
    dispatch(addExercisesToWorkout(exerciseObject));
    dispatch(appDoneLoading);
    dispatch(
      showMessageWithTimeout("warning", false, "Exercise(s) added!", 3000)
    );
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

type deleteExercise = {
  workoutId: number;
  exerciseId: number;
};

export const deleteExerciseFromWorkout = (
  deleteExercise: deleteExercise
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch(appLoading);
  const token = selectToken(getState());

  try {
    const { workoutId, exerciseId } = deleteExercise;
    const deletedWorkout = await axios.delete(
      `${apiUrl}/workouts/${workoutId}/${exerciseId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("this is deleted", deletedWorkout);
    dispatch(getWorkoutExercises(workoutId));
    dispatch(appDoneLoading());
    dispatch(
      showMessageWithTimeout("warning", false, "Exercise deleted!", 3000)
    );
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};

// delete workout
export const deleteWorkout = (
  workoutId: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch(appLoading);
  const token = selectToken(getState());

  try {
    await axios.delete(`${apiUrl}/workouts/${workoutId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(appDoneLoading);
    dispatch(getUsersWorkouts());
    dispatch(
      showMessageWithTimeout("warning", false, "Workout deleted!", 3000)
    );
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};
