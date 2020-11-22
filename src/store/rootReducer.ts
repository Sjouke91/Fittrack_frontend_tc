// src/store/reducer.js
import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";

const reducer = combineReducers({
  appState,
  user,
});

export default reducer;
export type RootState = ReturnType<typeof reducer>;
