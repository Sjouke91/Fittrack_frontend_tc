import {
  GET_ALL_EXERCISES,
  EMPTY_SEARCHED_EXERCISES,
  GET_WORKOUT_EXERCISES,
  ExerciseActionTypes,
  GET_LOGGED_EXERCISES,
  GET_EXERCISES_BY_SEARCH,
} from "./types";

const initialState = {
  workout: [],
  search: [],
  user: [],
  all: [],
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
    case GET_ALL_EXERCISES:
      return { ...state, all: action.payload };
    case EMPTY_SEARCHED_EXERCISES:
      return { ...state, search: [] };
    default:
      return state;
  }
};
