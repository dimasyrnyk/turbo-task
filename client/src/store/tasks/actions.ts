import ClientAPI from "../../middleware/ClientAPI";
import { TasksTypes } from "../../types/task";
import { showAlert } from "../app/actions";
import { AppDispatch } from "../reducers";

export const taskCheck = (id: string) => ({
  type: TasksTypes.TASK_CHECK,
  payload: id,
});

export const taskCheckAll = (value: boolean) => ({
  type: TasksTypes.TASK_CHECK_ALL,
  payload: value,
});

export const taskUncheckAll = () => ({
  type: TasksTypes.TASK_UNCHECK_ALL,
});

export const taskClear = () => ({
  type: TasksTypes.TASKS_CLEAR,
});

export function tasksLoad() {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: TasksTypes.TASKS_START_LOADING });
    const { response, data } = await ClientAPI.interceptedFetch("/api/task");

    if (!response.ok) {
      dispatch(
        showAlert({ text: data.message || "Щось пішло не так", error: true })
      );
    } else {
      dispatch({ type: TasksTypes.TASKS_LOAD, payload: data });
    }

    dispatch({ type: TasksTypes.TASKS_END_LOADING });
  };
}

export function taskCreate(task: any) {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch(
      "/api/task/create",
      {
        method: "POST",
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      dispatch(
        showAlert({ text: data.message || "Щось пішло не так", error: true })
      );
    } else {
      dispatch({ type: TasksTypes.TASK_CREATE, payload: data.task });
      dispatch(showAlert({ text: data.message, error: false }));
    }
  };
}

export function taskEdit(reqData: any) {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch(
      `/api/task/edit/${reqData.task._id}`,
      {
        method: "PUT",
        body: JSON.stringify(reqData.task),
      }
    );

    if (!response.ok) {
      dispatch(
        showAlert({ text: data.message || "Щось пішло не так", error: true })
      );
    } else {
      if (reqData.task.creator._id === reqData.userId) {
        dispatch({ type: TasksTypes.TASK_EDIT, payload: data.task });
      } else {
        dispatch({
          type: TasksTypes.TASK_FROM_OTHER_USER_EDIT,
          payload: data.task,
        });
      }
      dispatch(showAlert({ text: data.message, error: false }));
    }
  };
}

export function taskRead(reqData: any) {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch(
      `/api/task/read/${reqData.task._id}`,
      {
        method: "PUT",
        body: JSON.stringify(reqData.task),
      }
    );

    if (!response.ok) {
      console.log({ text: data.message || "Щось пішло не так" });
    } else {
      if (reqData.task.creator._id === reqData.userId) {
        dispatch({ type: TasksTypes.TASK_EDIT, payload: data.task });
      } else {
        dispatch({
          type: TasksTypes.TASK_FROM_OTHER_USER_EDIT,
          payload: data.task,
        });
      }
    }
  };
}

export function taskRemove(taskId: any) {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch(
      `/api/task/delete/${taskId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      dispatch(
        showAlert({ text: data.message || "Щось пішло не так", error: true })
      );
    } else {
      dispatch({ type: TasksTypes.TASK_REMOVE, payload: taskId });
      dispatch(showAlert({ text: data.message, error: false }));
    }
  };
}
