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

interface workoutToStateAction {
  type: typeof GET_USERS_WORKOUTS;
  payload: Workout[];
}

export type WorkoutActionTypes = workoutToStateAction;

export interface WorkoutsState {
  workouts: { all: WorkoutWithUser[] };
}
