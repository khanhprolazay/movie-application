import authenticationConstants from "@/constants/authentication.constant";
import { LoginDTO, ReduxAction, RegisterDTO } from "@/type";
import tokenUtils from "@/utils/tokenUtils";
import userActions from "./user.action";
import { TypedDispatch } from "@/redux/store";
import authApis from "@/apis/authApis";
import { NavigateFunction } from "react-router-dom";
import alertActions from "./alert.action";

function check() {
  return (dispatch: TypedDispatch) => {
    dispatch(request());

    const accessToken = tokenUtils.getAccessToken();
    const refreshToken = tokenUtils.getRefreshToken();

    if (accessToken && refreshToken) {
      dispatch(success());
      dispatch(userActions.getUser());
      return;
    }

    tokenUtils.clearToken();
    dispatch(error("User does not log in !!!"));
  }

  function request(): ReduxAction {
    return {
      type: authenticationConstants.AUTH_CHECK_REQUEST
    }
  }

  function success(): ReduxAction {
    return {
      type: authenticationConstants.AUTH_CHECK_SUCCESS,
    }
  }

  function error(error: string): ReduxAction {
    return {
      type: authenticationConstants.AUTH_CHECK_ERROR,
      payload: { error },
    }
  }
}

function login(values: LoginDTO, navigate: NavigateFunction) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());

    authApis.login(values)
      .then(res => {
        tokenUtils.saveAccessToken(res.accessToken);
        tokenUtils.saveRefreshToken(res.refreshToken);
        
        dispatch(success());
        dispatch(check());
        dispatch(alertActions.add("success", "Login successfully !!!"));

        navigate("/");
      })
      .catch(err => {
        dispatch(alertActions.add("error", err));
        dispatch(error(err));
      })


    function request(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_LOGIN_REQUEST,
      }
    }
    
    function success(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_LOGIN_SUCCESS,
      }
    }

    function error(error: string): ReduxAction {
      return {
        type: authenticationConstants.AUTH_LOGIN_ERROR,
        payload: { error }
      }
    }
  }
}

function logout() {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    dispatch(success());
    tokenUtils.clearToken();
    dispatch(userActions.clearUser());


    function request(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_LOGOUT_REQUEST,
      }
    }

    function success(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_LOGIN_SUCCESS
      }
    }
  }
}

function register(values: RegisterDTO, navigate: NavigateFunction) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());

    authApis.register(values)
      .then(() => {
        dispatch(success());
        navigate("/auth/login");
        dispatch(alertActions.add("success", "Register successfully !!!"));
      })
      .catch(err => {
        dispatch(error(err));
        dispatch(alertActions.add("error", err));
      })
    
    function request(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_SIGNUP_REQUEST,
      }
    }
    
    function success(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_SIGNUP_SUCCESS,
      }
    }

    function error(error: string): ReduxAction {
      return {
        type: authenticationConstants.AUTH_SIGNUP_ERROR,
        payload: { error },
      }
    }
  }
}

function googleLogin(accessToken: string, navigate: NavigateFunction) {
  return (dispatch: TypedDispatch) => {

    dispatch(request());
    authApis.googleLogin(accessToken)
      .then(response => {
        tokenUtils.saveAccessToken(response.accessToken);
        tokenUtils.saveRefreshToken(response.refreshToken);

        dispatch(success());
        dispatch(check());
        dispatch(alertActions.add("success", "Login successfully !!!"));

        navigate("/");
      })
      .catch(err => {
        dispatch(error(err));
        dispatch(alertActions.add("error", err));
      }) 

    function request() {
      return {
        type: authenticationConstants.AUTH_LOGIN_REQUEST,
      }
    }

    function success(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_GOOGLE_LOGIN_REQUEST,
      }
    }

    function error(error: string): ReduxAction {
      return {
        type: authenticationConstants.AUTH_GOOGLE_LOGIN_ERROR,
        payload: { error },
      }
    }
  }
}

const authenticationActions = { check, login, logout, register, googleLogin };
export default authenticationActions;