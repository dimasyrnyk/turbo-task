export interface IAlert {
  text: string;
  error: boolean;
}

export enum AlertColors {
  RED = "red",
  GREEN = "green",
}

export interface AppState {
  isLoading: boolean;
  alert: IAlert | null;
}

export enum AppActionTypes {
  APP_START_LOADING = "app/START_LOADING",
  APP_END_LOADING = "app/END_LOADING",
  APP_SHOW_ALERT = "app/SHOW_ALERT",
  APP_HIDE_ALERT = "app/HIDE_ALERT",
}

interface StartLoadingAction {
  type: AppActionTypes.APP_START_LOADING;
}

interface EndLoadingAction {
  type: AppActionTypes.APP_END_LOADING;
}

interface ShowAlertAction {
  type: AppActionTypes.APP_SHOW_ALERT;
  payload: IAlert;
}

interface HideAlertAction {
  type: AppActionTypes.APP_HIDE_ALERT;
}

export type AppAction =
  | StartLoadingAction
  | EndLoadingAction
  | ShowAlertAction
  | HideAlertAction;
