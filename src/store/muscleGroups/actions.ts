import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading } from "../appState/actions";
import { selectUser } from "../user/selectors";
import { Action } from "redux";
import { RootState } from "../rootReducer";
import { ThunkAction } from "redux-thunk";
import { MuscleGroup, MuscleGroupActionTypes, GET_MUSCLEGROUPS } from "./types";

const FetchMuscleGroupSucces = (
  muscleGroupArray: MuscleGroup[]
): MuscleGroupActionTypes => {
  return { type: GET_MUSCLEGROUPS, payload: muscleGroupArray };
};

export const getMuscleGroups = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch(appLoading);
  try {
    const res = await axios.get(`${apiUrl}/muscleGroups`);
    const muscleGroupArray: MuscleGroup[] = res.data;
    dispatch(appDoneLoading);
    dispatch(FetchMuscleGroupSucces(muscleGroupArray));
  } catch (e) {
    console.log("ERROR:", e.message);
  }
};
