export const GET_WORKOUT_EXERCISES = "GET_WORKOUT_EXERCISES";
export const SUBMIT_EXERCISE = "SUBMIT_EXERCISE";

export interface Exercise {
  id: number;
  name: string;
}

export type ExerciseSubmit = {
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

interface getWorkoutExercisesAction {
  type: typeof GET_WORKOUT_EXERCISES;
  payload: ExercisesWithWorkout[];
}

interface submitExerciseAction {
  type: typeof SUBMIT_EXERCISE;
  payload: ExerciseSubmit;
}

export type ExerciseActionTypes =
  | getWorkoutExercisesAction
  | submitExerciseAction;

export interface ExerciseState {
  exercises: { all: ExercisesWithWorkout[] };
}
