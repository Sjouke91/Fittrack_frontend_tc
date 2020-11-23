export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

export interface UserWithToken {
  id: number;
  token: string;
  name: string;
  email: string;
  gender: string | null;
  age: number | null;
  heightInCm: number | null;
  weightInKg: number | null;
}

export interface UserWithoutToken {
  id: number;
  name: string;
  email: string;
  gender: string | null;
  age: number | null;
  heightInCm: number | null;
  weightInKg: number | null;
}

interface LoginSuccesAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserWithToken;
}

interface tokenStillValidAction {
  type: typeof TOKEN_STILL_VALID;
  payload: UserWithoutToken;
}

interface logOutAction {
  type: typeof LOG_OUT;
}

export type UserActionTypes =
  | LoginSuccesAction
  | tokenStillValidAction
  | logOutAction;

export interface UserState {
  user: UserWithToken;
}
