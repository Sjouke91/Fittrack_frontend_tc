import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import workouts from "./workouts/reducer";
import exercises from "./exercises/reducer";

const reducer = combineReducers({
  appState,
  user,
  workouts,
  exercises,
});

export default reducer;
export type RootState = ReturnType<typeof reducer>;
