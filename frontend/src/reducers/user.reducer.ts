import userConstants from "@/constants/user.constant";
import { ReduxAction, User } from "@/type";

export interface UserRootState {
  loading: boolean,
  data: User | null,
  error: string | null,
}

const initialState: UserRootState = {
  loading: false,
  error: null,
  data: null,
}

export function user(state: UserRootState = initialState, action: ReduxAction): UserRootState {
  switch (action.type) {
    case userConstants.GET_USER_REQUEST:
      return {
        ...state,
        loading: true
      }

    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        data: action.payload?.user,
        loading: false,
      }

    case userConstants.GET_USER_ERROR:
      return {
        ...state,
        loading: false,
      }

    case userConstants.CLEAR_USER_REQUEST:
      return {
        ...state,
        loading: true
      }

    case userConstants.CLEAR_USER_SUCCESS:
      return {
        ...state, 
        data: null,
        loading: false
      }

    case userConstants.CLEAR_USER_ERROR: 
      return {
        ...state,
        data: null,
        loading: false,
      }

    default:
      return state;
  }
}