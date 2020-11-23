export const GET_USERS_WORKOUTS = "GET_USERS_WORKOUTS";

export interface Workout {
  id: number;
  name: string;
  intensity: string;
}

export interface WorkoutWithUser {
  userId: number;
  workoutId: number;
  workout: Workout;
}

interface workoutToState {
  type: typeof GET_USERS_WORKOUTS;
  payload: Workout[];
}

export type WorkoutActionTypes = workoutToState;

export interface WorkoutsState {
  workouts: { all: WorkoutWithUser[] };
}
