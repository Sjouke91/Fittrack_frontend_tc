import { MuscleGroupState } from "./types";

export const selectMuscleGroups = (state: MuscleGroupState) =>
  state.muscleGroups.all;
