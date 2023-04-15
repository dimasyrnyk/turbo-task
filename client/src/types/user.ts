export interface IUser {
  _id: string;
  email: string;
  password: string;
  login: string;
  avatar: string;
  ownTasks: string[];
  otherTasks: string[];
}

export interface UsersState {
  users: IUser[];
  oneUser: IUser | {};
  isLoading: boolean;
}

export enum UsersTypes {
  USERS_LOAD_BY_FILTER = "users/LOAD_BY_FILTER",
  USER_LOAD_ONE = "users/LOAD_ONE",
  USERS_START_LOADING = "users/START_LOADING",
  USERS_END_LOADING = "users/END_LOADING",
}

interface LoadFilteredUsersAction {
  type: UsersTypes.USERS_LOAD_BY_FILTER;
  payload: IUser[];
}

interface LoadOneUserAction {
  type: UsersTypes.USER_LOAD_ONE;
  payload: IUser;
}

interface StartLoadingAction {
  type: UsersTypes.USERS_START_LOADING;
}

interface EndLoadingAction {
  type: UsersTypes.USERS_END_LOADING;
}

export type UsersAction =
  | LoadFilteredUsersAction
  | LoadOneUserAction
  | StartLoadingAction
  | EndLoadingAction;
