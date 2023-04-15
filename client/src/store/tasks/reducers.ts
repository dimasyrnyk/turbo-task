import { TasksAction, TasksState, TasksTypes } from "../../types/task";

const initialState: TasksState = {
  ownTasks: [],
  otherTasks: [],
  isLoading: false,
};

export default function tasksReducer(
  state = initialState,
  action: TasksAction
) {
  switch (action.type) {
    case TasksTypes.TASK_CHECK:
      let newTasksList = [...state.ownTasks];
      newTasksList.map((task) =>
        task._id === action.payload ? (task.checked = !task.checked) : task
      );
      return { ...state, ownTasks: newTasksList };
    case TasksTypes.TASK_CHECK_ALL:
      let checkedList = [...state.ownTasks];
      action.payload
        ? checkedList.map((task) => (task.checked = true))
        : checkedList.map((task) => (task.checked = false));
      return { ...state, ownTasks: checkedList };
    case TasksTypes.TASK_UNCHECK_ALL:
      let uncheckedList = [...state.ownTasks];
      uncheckedList.map((task) => (task.checked = false));
      return { ...state, ownTasks: uncheckedList };
    case TasksTypes.TASKS_LOAD:
      return {
        ...initialState,
        ownTasks: action.payload.ownTasks.reverse(), // to show own tasks from new to old
        otherTasks: action.payload.otherTasks.reverse(), // to show other tasks from new to old
      };
    case TasksTypes.TASK_CREATE:
      return { ...state, ownTasks: [action.payload, ...state.ownTasks] };
    case TasksTypes.TASK_REMOVE:
      const newOwnTasks = [...state.ownTasks].filter(
        (task) => task._id !== action.payload
      );
      return { ...state, ownTasks: newOwnTasks };
    case TasksTypes.TASK_EDIT:
      const newOwnTasksList = [...state.ownTasks].map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
      return { ...state, ownTasks: newOwnTasksList };
    case TasksTypes.TASK_FROM_OTHER_USER_EDIT:
      const newOtherTaskList = [...state.otherTasks].map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
      return { ...state, otherTasks: newOtherTaskList };
    case TasksTypes.TASKS_CLEAR:
      return initialState;
    case TasksTypes.TASKS_START_LOADING:
      return { ...state, isLoading: true };
    case TasksTypes.TASKS_END_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
