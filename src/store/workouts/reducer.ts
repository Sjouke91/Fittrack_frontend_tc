import {
  WorkoutActionTypes,
  GET_USERS_WORKOUTS,
  ADD_USERS_WORKOUTS,
} from "./types";

const initialState = {
  all: [],
};

// eslint-disable-next-line
export default (state = initialState, action: WorkoutActionTypes) => {
  switch (action.type) {
    case GET_USERS_WORKOUTS:
      return { ...state, all: action.payload };

    // case "DELETE_WORKOUTS":
    //   return { ...state, all: [] };

    case ADD_USERS_WORKOUTS:
      return { ...state, all: [...state.all, action.payload] };

    // case "UPDATE_WORKOUT":
    //     return {
    //
    //     };

    default:
      return state;
  }
};
