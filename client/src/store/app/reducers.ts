import { AppAction, AppActionTypes, AppState } from "../../types/app";

const initialState: AppState = {
  isLoading: false,
  alert: null,
};

export default function appReducer(
  state = initialState,
  action: AppAction
): AppState {
  switch (action.type) {
    case AppActionTypes.APP_START_LOADING:
      return { ...state, isLoading: true };
    case AppActionTypes.APP_END_LOADING:
      return { ...state, isLoading: false };
    case AppActionTypes.APP_SHOW_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case AppActionTypes.APP_HIDE_ALERT:
      return { ...state, alert: null };
    default:
      return state;
  }
}
