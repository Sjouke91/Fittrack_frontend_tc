export const GET_USERS_WORKOUTS = "GET_USERS_WORKOUTS";

export interface Workout {
  name: string;
  intesity: string;
}

interface workoutToState {
  type: typeof GET_USERS_WORKOUTS;
  payload: Workout[];
}

export type WorkoutActionTypes = workoutToState;

export interface WorkoutsState {
  all: Workout[];
}
