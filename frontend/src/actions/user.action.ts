import userApis from "@/apis/userApis";
import userConstants from "@/constants/user.constant";
import { ReduxAction, User } from "@/type";
import { Dispatch } from "redux";

function getUser() {
  return (dispatch: Dispatch) => {
    dispatch(request());
    userApis.getProfile()
      .then(data => dispatch(success(data)))
      .catch(err => dispatch(error(err)))

    function request(): ReduxAction {
      return { 
        type: userConstants.GET_USER 
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

const userActions = { getUser };
export default userActions;