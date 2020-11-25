export const GET_MUSCLEGROUPS = "GET_MUSCLEGROUPS";

export interface MuscleGroup {
  id: number;
  name: string;
}

interface workoutToStateAction {
  type: typeof GET_MUSCLEGROUPS;
  payload: MuscleGroup[];
}

export type MuscleGroupActionTypes = workoutToStateAction;

export interface MuscleGroupState {
  muscleGroups: { all: MuscleGroup[] };
}
