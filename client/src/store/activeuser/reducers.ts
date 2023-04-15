import {
  ActiveUserAction,
  ActiveUserTypes,
  ActiveUserState,
} from "../../types/activeUser";

const initialState: ActiveUserState = {
  auth: false,
  token: null,
  userId: null,
  info: {},
  isLoading: false,
};

export default function activeUserReducer(
  state = initialState,
  action: ActiveUserAction
) {
  switch (action.type) {
    case ActiveUserTypes.USER_SIGNIN:
      return {
        ...state,
        auth: true,
        token: action.payload.token,
        userId: action.payload.user._id,
        info: action.payload.user,
      };
    case ActiveUserTypes.USER_SIGNUP:
      return {
        ...state,
        auth: true,
        token: action.payload.token,
        userId: action.payload.user._id,
        info: action.payload.user,
      };
    case ActiveUserTypes.USER_SIGNOUT:
      return { ...state, auth: false, token: null, userId: null, info: {} };
    case ActiveUserTypes.USER_REFRESH_TOKEN:
      return { ...state, token: action.payload };
    case ActiveUserTypes.USER_START_LOADING:
      return { ...state, isLoading: true };
    case ActiveUserTypes.USER_END_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
