import userApis from "@/apis/userApis";
import userConstants from "@/constants/user.constant";
import { ReduxAction, User } from "@/type";
import tokenUtils from "@/utils/tokenUtils";
import authenticationActions from "./authentication.action";
import { TypedDispatch } from "@/redux/store";

function getUser() {
  return (dispatch: TypedDispatch) => {
    dispatch(request());

    userApis.getProfile()
      .then(data => dispatch(success(data)))
      .catch(err => {
        tokenUtils.clearToken();
        dispatch(error(err));
        dispatch(authenticationActions.check());
      })

    function request(): ReduxAction {
      return { 
        type: userConstants.GET_USER_REQUEST
      }
    }

    function success(user: User): ReduxAction {
      return {
        type: userConstants.GET_USER_SUCCESS,
        payload: { user },
      }
    }

    function error(error: string): ReduxAction {
      return {
        type: userConstants.GET_USER_ERROR,
        payload: { error },
      }
    }
  }
}

function clearUser() {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    dispatch(success());

    function request(): ReduxAction {
      return { 
        type: userConstants.CLEAR_USER_REQUEST
      }
    }

    function success(): ReduxAction {
      return {
        type: userConstants.CLEAR_USER_SUCCESS,
      }
    }
  }
}

const userActions = { getUser, clearUser };
export default userActions;