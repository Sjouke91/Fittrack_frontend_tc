import { WorkoutsState } from "./types";

export const selectUsersWorkouts = (state: WorkoutsState) => state.workouts.all;
