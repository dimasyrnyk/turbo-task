import { AnyAction, combineReducers } from "redux";
import { ThunkDispatch } from "redux-thunk";

import activeUserReducer from "./activeuser/reducers";
import usersReducer from "./users/reducers";
import tasksReducer from "./tasks/reducers";
import appReducer from "./app/reducers";

const rootReducer = combineReducers({
  activeUser: activeUserReducer,
  app: appReducer,
  users: usersReducer,
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
