export type Exercise = {
  id: number;
  name: string;
  muscleId: number;
};

export type ExerciseLog = {
  id: number;
  userId: number;
  workoutId: number;
  exerciseId: number;
  kg: number;
  sets: number;
  reps: number;
  RPE: number;
  date: string;
};

export type User = {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  heightInCm: number;
  weightInKg: number;
};

export type Workout = {
  name: string;
  intensity: string;
};

export type MuscleGroup = {
  name: string;
  id: number;
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

export type WorkoutState = ExerciseSubmit[];

export interface ParamTypes {
  id: string;
}

export type Search = {
  exerciseName: string;
  muscleGroupId: string;
};
