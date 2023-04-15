export interface ITask {
  _id: string;
  title: string;
  users: [];
  creator: {
    _id: string;
    login: string;
    avatar: string;
  };
  priority: string;
  deadline: string;
  status: string;
  checked: boolean;
  readedBy: string[];
  text: string;
}

export enum TaskPriority {
  TITLE = "Приорітет",
  NAME = "priority",
  HIGH = "Високий",
  MEDIUM = "Середній",
  LOW = "Низький",
}

export enum TaskStatus {
  TITLE = "Статус",
  NAME = "status",
  NEW = "Нове",
  WORK_ON_IT = "В роботі",
  DONE = "Виконано",
  STUCK = "Застряг",
}

export enum TaskStatusIcon {
  NEW = "fontawesome-circle-arrow-right ",
  WORK_ON_IT = "fontawesome-exclamation-sign ",
  DONE = "fontawesome-ok-sign ",
  STUCK = "fontawesome-minus-sign ",
}

export interface TasksState {
  ownTasks: ITask[];
  otherTasks: ITask[];
  isLoading: boolean;
}

export enum TasksTypes {
  TASK_CHECK = "tasks/CHECK",
  TASK_CHECK_ALL = "tasks/CHECK_ALL",
  TASK_UNCHECK_ALL = "tasks/UNCHECK_ALL",
  TASK_CREATE = "tasks/CREATE",
  TASK_REMOVE = "tasks/REMOVE",
  TASK_EDIT = "tasks/EDIT",
  TASK_FROM_OTHER_USER_EDIT = "tasks/FROM_OTHER_USER_EDIT",
  TASKS_LOAD = "tasks/LOAD",
  TASKS_CLEAR = "tasks/CLEAR",
  TASKS_START_LOADING = "tasks/START_LOADING",
  TASKS_END_LOADING = "tasks/END_LOADING",
}

interface CheckOneAction {
  type: TasksTypes.TASK_CHECK;
  payload: string;
}

interface CheckAllAction {
  type: TasksTypes.TASK_CHECK_ALL;
  payload: boolean;
}

interface UncheckAllAction {
  type: TasksTypes.TASK_UNCHECK_ALL;
}

interface CreateAction {
  type: TasksTypes.TASK_CREATE;
  payload: ITask;
}

interface RemoveAction {
  type: TasksTypes.TASK_REMOVE;
  payload: string;
}

interface EditAction {
  type: TasksTypes.TASK_EDIT;
  payload: ITask;
}

interface EditFromOtherUserAction {
  type: TasksTypes.TASK_FROM_OTHER_USER_EDIT;
  payload: ITask;
}

interface loadTasksAction {
  type: TasksTypes.TASKS_LOAD;
  payload: {
    ownTasks: ITask[];
    otherTasks: ITask[];
  };
}

interface ClearTasksAction {
  type: TasksTypes.TASKS_CLEAR;
}

interface StartLoadingAction {
  type: TasksTypes.TASKS_START_LOADING;
}

interface EndLoadingAction {
  type: TasksTypes.TASKS_END_LOADING;
}

export type TasksAction =
  | CheckOneAction
  | CheckAllAction
  | UncheckAllAction
  | CreateAction
  | RemoveAction
  | EditAction
  | EditFromOtherUserAction
  | loadTasksAction
  | ClearTasksAction
  | StartLoadingAction
  | EndLoadingAction;
