import {
  GET_WORKOUT_EXERCISES,
  ExerciseActionTypes,
  ExerciseState,
  ExercisesWithWorkout,
  Exercise,
} from "./types";

export const importExercises = (state: ExerciseState) => {
  const exerciseArray = state.exercises.all.map((e) => {
    return e.exercise;
  });

  return exerciseArray;
};
