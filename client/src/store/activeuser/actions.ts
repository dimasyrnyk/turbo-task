import { ActiveUserTypes } from "../../types/activeUser";
import { showAlert } from "../app/actions";
import { AppDispatch } from "../reducers";
import { tasksLoad, taskClear } from "../tasks/actions";

export const userSignOut = () => {
  return async (dispatch: AppDispatch) => {
    await fetch("/api/user/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("activeUser");
    dispatch({ type: ActiveUserTypes.USER_SIGNOUT });
    dispatch(taskClear());
  };
};

export function userSignUp(data: any) {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ActiveUserTypes.USER_START_LOADING });
    const response = await fetch("/api/user/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(
        showAlert({ text: json.message || "Щось пішло не так", error: true })
      );
    } else {
      dispatch({
        type: ActiveUserTypes.USER_SIGNUP,
        payload: { user: json.user, token: json.accessToken },
      });
      dispatch(showAlert({ text: json.message, error: false }));

      localStorage.setItem(
        "activeUser",
        JSON.stringify({
          userId: json.user._id,
          accessToken: json.accessToken,
        })
      );
    }

    dispatch({ type: ActiveUserTypes.USER_END_LOADING });
  };
}

export function userSignIn(data: any) {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ActiveUserTypes.USER_START_LOADING });
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(
        showAlert({ text: json.message || "Щось пішло не так", error: true })
      );
    } else {
      dispatch({
        type: ActiveUserTypes.USER_SIGNIN,
        payload: { user: json.user, token: json.accessToken },
      });
      dispatch(showAlert({ text: json.message, error: false }));
      dispatch(tasksLoad());

      localStorage.setItem(
        "activeUser",
        JSON.stringify({
          userId: json.user._id,
          accessToken: json.accessToken,
        })
      );
    }

    dispatch({ type: ActiveUserTypes.USER_END_LOADING });
  };
}

export function userCheckAuth() {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ActiveUserTypes.USER_START_LOADING });
    const response = await fetch(`/api/user/refresh`, {
      method: "GET",
      credentials: "include",
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(
        showAlert({ text: json.message || "Щось пішло не так", error: true })
      );
    } else {
      dispatch({
        type: ActiveUserTypes.USER_SIGNIN,
        payload: { user: json.user, token: json.accessToken },
      });
      dispatch(tasksLoad());

      localStorage.setItem(
        "activeUser",
        JSON.stringify({
          userId: json.user._id,
          accessToken: json.accessToken,
        })
      );
    }

    dispatch({ type: ActiveUserTypes.USER_END_LOADING });
  };
}

export function refreshToken() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`/api/user/refresh`, {
      method: "GET",
      credentials: "include",
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(
        showAlert({ text: json.message || "Токен не оновлено", error: true })
      );
    } else {
      dispatch({
        type: ActiveUserTypes.USER_REFRESH_TOKEN,
        payload: json.accessToken,
      });

      localStorage.setItem(
        "activeUser",
        JSON.stringify({
          userId: json.user._id,
          accessToken: json.accessToken,
        })
      );

      return json;
    }
  };
}
