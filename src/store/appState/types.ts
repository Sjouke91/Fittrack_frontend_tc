export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export interface Message {
  variant: string;
  dismissable: boolean;
  text: string;
}

interface SetMessageAction {
  type: typeof SET_MESSAGE;
  payload: {};
}

interface ClearMessageAction {
  type: typeof CLEAR_MESSAGE;
}

interface appDoneLoadingAction {
  type: typeof APP_DONE_LOADING;
}

interface appLoadingAction {
  type: typeof APP_LOADING;
}

export type AppStateActionTypes =
  | SetMessageAction
  | ClearMessageAction
  | appDoneLoadingAction
  | appLoadingAction;

export interface AppState {
  appState: {
    loading: boolean;
    message: Message;
  };
}
