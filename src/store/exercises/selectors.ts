import {
  GET_WORKOUT_EXERCISES,
  ExerciseActionTypes,
  ExerciseState,
  ExercisesWithWorkout,
  Exercise,
} from "./types";
import * as _ from "lodash";

export const importWorkoutExercises = (state: ExerciseState) => {
  const exerciseArray = state.exercises.workout.map((e) => {
    return e.exercise;
  });

  return exerciseArray;
};

export const selectAllExercises = (state: ExerciseState) => state.exercises.all;

export const importSearchedExercises = (state: ExerciseState) =>
  state.exercises.search;

export const SelectUserWorkouts = (state: ExerciseState) => {
  const newArray = state.exercises.user.filter(
    (v, i, a) =>
      a.findIndex(
        (t) =>
          t.workout.id === v.workout.id && t.workoutStart === v.workoutStart
      ) === i
  );

  const schedulerData = newArray.map((e) => {
    return {
      startDate: e.workoutStart,
      endDate: e.createdAt,
      title: e.workout.name,
    };
  });

  return schedulerData;
};

export const SelectUserExercises = (state: ExerciseState) => {
  const exercisesByWorkout = _.mapValues(
    _.groupBy(state.exercises.user, "workout.id")
  );

  return exercisesByWorkout;
};

export const SelectLoggedExercises = (state: ExerciseState) => {
  const ExercisesGroupedByWorkout = state.exercises.user
    ? _.mapValues(_.groupBy(state.exercises.user, "workoutStart"), (elist) =>
        elist.map((exercise) => _.omit(exercise, "workoutStart"))
      )
    : [];

  const sortedGroupedByExDate = Object.entries(ExercisesGroupedByWorkout).sort(
    (a, b) => {
      const dateA = new Date(a[0]);
      const dateB = new Date(b[0]);
      return dateA.getTime() - dateB.getTime();
    }
  );

  const dateAndExerciseArray = sortedGroupedByExDate.map((w) => {
    return { date: w[0], exercises: w[1] };
  });

  const sortedExerciseArray = dateAndExerciseArray.sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  );
  return sortedExerciseArray;
};
