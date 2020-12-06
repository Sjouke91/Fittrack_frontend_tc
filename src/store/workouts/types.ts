export const GET_USERS_WORKOUTS = "GET_USERS_WORKOUTS";
export const ADD_USERS_WORKOUTS = "ADD_USERS_WORKOUTS";

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

export type ExerciseWithoutMuscle = {
  id: number;
  name: string;
};

export interface AddExBySearch {
  workoutId: number;
  exercise: ExerciseWithoutMuscle;
}

interface workoutToStateAction {
  type: typeof GET_USERS_WORKOUTS;
  payload: Workout[];
}

interface AddworkoutToStateAction {
  type: typeof ADD_USERS_WORKOUTS;
  payload: Workout[];
}

export type WorkoutActionTypes = workoutToStateAction | AddworkoutToStateAction;

export interface WorkoutsState {
  workouts: { all: Workout[] };
}
