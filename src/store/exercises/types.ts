export const GET_ALL_EXERCISES = "GET_ALL_EXERCISES";
export const GET_WORKOUT_EXERCISES = "GET_WORKOUT_EXERCISES";
export const SUBMIT_EXERCISE = "SUBMIT_EXERCISE";

export interface Exercise {
  id: number;
  name: string;
  muscleId: number;
}

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

export type ExerciseActionTypes =
  | getAllExercisesAction
  | getWorkoutExercisesAction
  | submitExerciseAction;

export interface ExerciseState {
  exercises: { workout: ExercisesWithWorkout[]; all: Exercise[] };
}
