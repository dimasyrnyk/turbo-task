import ClientAPI from "../../middleware/ClientAPI";
import { UsersTypes } from "../../types/user";
import { showAlert } from "../app/actions";
import { AppDispatch } from "../reducers";

export function usersFilterFetch(value: any) {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: UsersTypes.USERS_START_LOADING });
    const { response, data } = await ClientAPI.interceptedFetch(
      `/api/user/filter/${value}`
    );

    if (!response.ok) {
      dispatch(
        showAlert({ text: data.message || "Щось пішло не так", error: true })
      );
    } else {
      dispatch({ type: UsersTypes.USERS_LOAD_BY_FILTER, payload: data });
    }
    dispatch({ type: UsersTypes.USERS_END_LOADING });
  };
}

export function oneUserFetch(userId: any) {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: UsersTypes.USERS_START_LOADING });
    const { response, data } = await ClientAPI.interceptedFetch(
      `/api/user/${userId}`
    );

    if (!response.ok) {
      dispatch(
        showAlert({ text: data.message || "Щось пішло не так", error: true })
      );
    } else {
      dispatch({ type: UsersTypes.USER_LOAD_ONE, payload: data });
    }
    dispatch({ type: UsersTypes.USERS_END_LOADING });
  };
}
