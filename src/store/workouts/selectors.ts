import {
  WorkoutActionTypes,
  Workout,
  GET_USERS_WORKOUTS,
  WorkoutsState,
} from "./types";

export const selectUsersWorkouts = (state: WorkoutsState) => {
  const workoutArray = state.workouts.all.map((w) => {
    return w.workout;
  });

  return workoutArray;
};
