import userApis from "@/apis/userApis";
import userConstants from "@/constants/user.constant";
import { ReduxAction, User } from "@/type";
import { Dispatch } from "redux";

function getUser() {
  return (dispatch: Dispatch) => {
    dispatch(request());
    userApis.getProfile()
      .then(data => {
        console.log(data);
        dispatch(success(data));
      })
      .catch(err => dispatch(error(err)))

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
  return (dispatch: Dispatch) => {
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