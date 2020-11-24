import { MuscleGroup, MuscleGroupActionTypes, GET_MUSCLEGROUPS } from "./types";

const initialState = {
  all: [],
};

// eslint-disable-next-line
export default (state = initialState, action: MuscleGroupActionTypes) => {
  switch (action.type) {
    case GET_MUSCLEGROUPS:
      return { ...state, all: action.payload };

    // case "DELETE_WORKOUTS":
    //   return { ...state, all: [] };

    // case "ADD_WORKOUT":
    //     return {
    //
    //     };

    // case "UPDATE_WORKOUT":
    //     return {
    //
    //     };

    default:
      return state;
  }
};
