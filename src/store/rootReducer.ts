import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import workouts from "./workouts/reducer";

const reducer = combineReducers({
  appState,
  user,
  workouts,
});

export default reducer;
export type RootState = ReturnType<typeof reducer>;
