import { UsersAction, UsersState, UsersTypes } from "../../types/user";

const initialState: UsersState = {
  users: [],
  oneUser: {},
  isLoading: false,
};

export default function usersReducer(
  state = initialState,
  action: UsersAction
) {
  switch (action.type) {
    case UsersTypes.USERS_LOAD_BY_FILTER:
      return { ...state, users: action.payload };
    case UsersTypes.USER_LOAD_ONE:
      return { ...state, oneUser: action.payload };
    case UsersTypes.USERS_START_LOADING:
      return { ...state, isLoading: true };
    case UsersTypes.USERS_END_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
