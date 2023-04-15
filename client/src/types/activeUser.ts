import { IUser } from "./user";

export interface ActiveUserState {
  auth: boolean;
  token: string | null;
  userId: string | null;
  info: IUser | {};
  isLoading: boolean;
}

export enum ActiveUserTypes {
  USER_SIGNIN = "activeUser/SIGNIN",
  USER_SIGNUP = "activeUser/SIGNUP",
  USER_SIGNOUT = "activeUser/SIGNOUT",
  USER_REFRESH_TOKEN = "activeUser/REFRESH_TOKEN",
  USER_START_LOADING = "activeUser/START_LOADING",
  USER_END_LOADING = "activeUser/END_LOADING",
}

interface SignInAction {
  type: ActiveUserTypes.USER_SIGNIN;
  payload: {
    user: IUser;
    token: string;
  };
}

interface SignUpAction {
  type: ActiveUserTypes.USER_SIGNUP;
  payload: {
    user: IUser;
    token: string;
  };
}

interface SignOutAction {
  type: ActiveUserTypes.USER_SIGNOUT;
}

interface RefreshTokenAction {
  type: ActiveUserTypes.USER_REFRESH_TOKEN;
  payload: string;
}

interface StartLoadingAction {
  type: ActiveUserTypes.USER_START_LOADING;
}

interface EndLoadingAction {
  type: ActiveUserTypes.USER_END_LOADING;
}

export type ActiveUserAction =
  | SignInAction
  | SignUpAction
  | SignOutAction
  | RefreshTokenAction
  | StartLoadingAction
  | EndLoadingAction;
