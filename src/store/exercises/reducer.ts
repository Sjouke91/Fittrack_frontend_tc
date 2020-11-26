import {
  GET_WORKOUT_EXERCISES,
  ExerciseActionTypes,
  GET_LOGGED_EXERCISES,
  GET_EXERCISES_BY_SEARCH,
} from "./types";

const initialState = {
  workout: [],
  search: [],
  user: [],
};

// eslint-disable-next-line
export default (state = initialState, action: ExerciseActionTypes) => {
  switch (action.type) {
    case GET_WORKOUT_EXERCISES:
      return { ...state, workout: action.payload };
    case GET_LOGGED_EXERCISES:
      return { ...state, user: action.payload };
    case GET_EXERCISES_BY_SEARCH:
      return { ...state, search: action.payload };
    default:
      return state;
  }
};
