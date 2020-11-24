import {
  GET_WORKOUT_EXERCISES,
  ExerciseActionTypes,
  GET_ALL_EXERCISES,
} from "./types";

const initialState = {
  workout: [],
  all: [],
};

// eslint-disable-next-line
export default (state = initialState, action: ExerciseActionTypes) => {
  switch (action.type) {
    case GET_WORKOUT_EXERCISES:
      return { ...state, workout: action.payload };
    case GET_ALL_EXERCISES:
      return { ...state, all: [...state.all, ...action.payload] };
    default:
      return state;
  }
};
