import { UserState } from "./types";

export const selectToken = (state: UserState) => state.user.token;

export const selectUser = (state: UserState) => state.user;
