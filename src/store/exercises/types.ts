export const GET_LOGGED_EXERCISES = "GET_LOGGED_EXERCISES";
export const GET_EXERCISES_BY_SEARCH = "GET_EXERCISES_BY_SEARCH";
export const GET_WORKOUT_EXERCISES = "GET_WORKOUT_EXERCISES";
export const SUBMIT_EXERCISE = "SUBMIT_EXERCISE";
export const GET_ALL_EXERCISES = "GET_ALL_EXERCISES";
export const EMPTY_SEARCHED_EXERCISES = "EMPTY_SEARCHED_EXERCISES";
export const ADD_EXERCISES_TO_WORKOUT = "ADD_EXERCISES_TO_WORKOUT";
export const DELETE_EXERCISE = "DELETE_EXERCISE";

export type Exercise = {
  id: number;
  name: string;
  muscleGroup: MuscleGroup;
};

export type loggedExercise = {
  exerciseId: number;
  id: number;
  kg: number;
  sets: number;
  reps: number;
  RPE: number;
  workout: MuscleGroup;
  exercise: MuscleGroup;
  workoutStart: string;
  createdAt: string;
};

export type MuscleGroup = {
  id: number;
  name: string;
};

export type ExerciseSubmit = {
  workoutStart: Date | null;
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

export type ExerciseWithoutMuscle = {
  id: number;
  name: string;
};

export interface AddExBySearch {
  workoutId: number;
  exercise: ExerciseWithoutMuscle;
}

interface getExercisesBySearchAction {
  type: typeof GET_EXERCISES_BY_SEARCH;
  payload: Exercise[];
}

interface emptySearch {
  type: typeof EMPTY_SEARCHED_EXERCISES;
}

interface getAllExercisesAction {
  type: typeof GET_ALL_EXERCISES;
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

interface addExercisesToWorkout {
  type: typeof ADD_EXERCISES_TO_WORKOUT;
  payload: AddExBySearch;
}

interface deleteExerciseSucces {
  type: typeof DELETE_EXERCISE;
  payload: number;
}

export type ExerciseActionTypes =
  | getLoggedExercisesOfUser
  | getWorkoutExercisesAction
  | submitExerciseAction
  | getExercisesBySearchAction
  | getAllExercisesAction
  | emptySearch
  | addExercisesToWorkout
  | deleteExerciseSucces;

export interface ExerciseState {
  exercises: {
    workout: ExercisesWithWorkout[];
    search: Exercise[];
    user: loggedExercise[];
    all: Exercise[];
  };
}
