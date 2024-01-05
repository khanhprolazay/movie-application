import userService from "@/services/user.service";
import userConstants from "@/constants/user.constant";
import { ReduxAction, UpdatePasswordDto, User } from "@/models";
import tokenUtils from "@/utils/token.util";
import authenticationActions from "./authentication.action";
import { TypedDispatch } from "@/redux/store";
import alertActions from "./alert.action";

const userActions = { 
  getUser, 
  clearUser,
  updateUser,
  updatePassword,
};
export default userActions;

function getUser() {
  return (dispatch: TypedDispatch) => {
    dispatch(request());

    userService
      .getProfile()
      .then((data) => dispatch(success(data)))
      .catch((err) => {
        tokenUtils.clearToken();
        dispatch(error(err));
        dispatch(authenticationActions.check());
      });

    function request(): ReduxAction {
      return {
        type: userConstants.GET_USER_REQUEST,
      };
    }

    function success(user: User): ReduxAction {
      return {
        type: userConstants.GET_USER_SUCCESS,
        payload: { user },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: userConstants.GET_USER_ERROR,
        payload: { error },
      };
    }
  };
}

function updateUser(user: Partial<User>) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());

    userService
      .updateProfile(user)
      .then((data) => {
        dispatch(success(data));
        dispatch(alertActions.add("success", "Update profile successfully !!!"));
      })
      .catch((err) => {
        dispatch(error(err));
        dispatch(alertActions.add("error", err[0]));
      });

    function request(): ReduxAction {
      return {
        type: userConstants.UPDATE_USER_REQUEST,
      };
    }

    function success(user: User): ReduxAction {
      return {
        type: userConstants.UPDATE_USER_SUCCESS,
        payload: { user },
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: userConstants.UPDATE_USER_ERROR,
        payload: { error },
      };
    }
  };
}

function clearUser() {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    dispatch(success());

    function request(): ReduxAction {
      return {
        type: userConstants.CLEAR_USER_REQUEST,
      };
    }

    function success(): ReduxAction {
      return {
        type: userConstants.CLEAR_USER_SUCCESS,
      };
    }
  };
}

function updatePassword(data: UpdatePasswordDto) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());

    userService
      .updatePassword(data)
      .then(() => {
        dispatch(success());
        dispatch(alertActions.add("success", "Update password successfully !!!"));
      })
      .catch((err) => {
        dispatch(error(err));
        dispatch(alertActions.add("error", err));
      });

    function request(): ReduxAction {
      return {
        type: userConstants.UPDATE_PASSWORD_REQUEST,
      };
    }

    function success(): ReduxAction {
      return {
        type: userConstants.UPDATE_PASSWORD_SUCCESS,
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: userConstants.UPDATE_PASSWORD_ERROR,
        payload: { error },
      };
    }
  }
}