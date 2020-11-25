import {
  GET_WORKOUT_EXERCISES,
  ExerciseActionTypes,
  ExerciseState,
  ExercisesWithWorkout,
  Exercise,
} from "./types";

export const importWorkoutExercises = (state: ExerciseState) => {
  const exerciseArray = state.exercises.workout.map((e) => {
    return e.exercise;
  });

  return exerciseArray;
};

export const importAllExercises = (state: ExerciseState) => state.exercises.all;
