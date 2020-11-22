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
};
