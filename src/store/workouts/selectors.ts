import {
  WorkoutActionTypes,
  Workout,
  GET_USERS_WORKOUTS,
  WorkoutsState,
} from "./types";

export const selectWorkouts = (state: WorkoutsState) => state.all;
