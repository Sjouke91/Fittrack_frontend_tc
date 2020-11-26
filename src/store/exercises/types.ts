export const GET_LOGGED_EXERCISES = "GET_LOGGED_EXERCISES";
export const GET_EXERCISES_BY_SEARCH = "GET_EXERCISES_BY_SEARCH";
export const GET_WORKOUT_EXERCISES = "GET_WORKOUT_EXERCISES";
export const SUBMIT_EXERCISE = "SUBMIT_EXERCISE";

export type Exercise = {
  id: number;
  name: string;
  muscleGroup: MuscleGroup;
};

export type loggedExercise = {
  id: number;
  kg: number;
  sets: number;
  reps: number;
  RPE: number;
  workout: MuscleGroup;
  workoutStart: string;
  createdAt: string;
};

export type MuscleGroup = {
  id: number;
  name: string;
};

export type ExerciseSubmit = {
  workoutId: number;
  id: number | null;
  kg: number | null;
  sets: number | null;
  reps: number | null;
  RPE: number | null;
};

export interface ExercisesWithWorkout {
  exerciseId: number;
  workoutId: number;
  exercise: Exercise;
}

interface getExercisesBySearchAction {
  type: typeof GET_EXERCISES_BY_SEARCH;
  payload: Exercise[];
}

interface getWorkoutExercisesAction {
  type: typeof GET_WORKOUT_EXERCISES;
  payload: ExercisesWithWorkout[];
}

interface submitExerciseAction {
  type: typeof SUBMIT_EXERCISE;
  payload: ExerciseSubmit;
}

interface getLoggedExercisesOfUser {
  type: typeof GET_LOGGED_EXERCISES;
  payload: loggedExercise[];
}

export type ExerciseActionTypes =
  | getLoggedExercisesOfUser
  | getWorkoutExercisesAction
  | submitExerciseAction
  | getExercisesBySearchAction;

export interface ExerciseState {
  exercises: {
    workout: ExercisesWithWorkout[];
    search: Exercise[];
    user: loggedExercise[];
  };
}
