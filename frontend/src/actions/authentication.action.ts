import authenticationConstants from "@/constants/authentication.constant";
import { LoginDTO, ReduxAction, RegisterDTO } from "@/models";
import tokenUtils from "@/utils/token.util";
import userActions from "./user.action";
import { TypedDispatch } from "@/redux/store";
import authService from "@/services/auth.service";
import { NavigateFunction } from "react-router-dom";
import alertActions from "./alert.action";
import { googleLogout } from "@react-oauth/google";

const authenticationActions = { check, login, logout, register, googleLogin };
export default authenticationActions;

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

    dispatch(logout());
    dispatch(error("User does not log in !!!"));
  };

  function request(): ReduxAction {
    return {
      type: authenticationConstants.AUTH_CHECK_REQUEST,
    };
  }

  function success(): ReduxAction {
    return {
      type: authenticationConstants.AUTH_CHECK_SUCCESS,
    };
  }

  function error(error: string): ReduxAction {
    return {
      type: authenticationConstants.AUTH_CHECK_ERROR,
      payload: { error },
    };
  }
}

function login(values: LoginDTO, navigate: NavigateFunction) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());

    authService
      .login(values)
      .then((res) => {
        tokenUtils.saveAccessToken(res.accessToken);
        tokenUtils.saveRefreshToken(res.refreshToken);

        dispatch(success());
        dispatch(check());
        dispatch(alertActions.add("success", "Login successfully !!!"));

        navigate("/");
      })
      .catch((err) => {
        dispatch(alertActions.add("error", err));
        dispatch(error(err));
      });

    function request(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_LOGIN_REQUEST,
      };
    }

    function success(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_LOGIN_SUCCESS,
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: authenticationConstants.AUTH_LOGIN_ERROR,
        payload: { error },
      };
    }
  };
}

function logout() {
  return (dispatch: TypedDispatch) => {
    dispatch(request());
    dispatch(success());
    dispatch(userActions.clearUser());
    googleLogout();

    tokenUtils.clearToken();

    function request(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_LOGOUT_REQUEST,
      };
    }

    function success(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_LOGOUT_SUCCESS,
      };
    }
  };
}

function register(values: RegisterDTO, navigate: NavigateFunction) {
  return (dispatch: TypedDispatch) => {
    dispatch(request());

    authService
      .register(values)
      .then(() => {
        dispatch(success());
        navigate("/auth/login");
        dispatch(alertActions.add("success", "Register successfully !!!"));
      })
      .catch((err) => {
        dispatch(error(err));
        dispatch(alertActions.add("error", err[0]));
      });

    function request(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_SIGNUP_REQUEST,
      };
    }

    function success(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_SIGNUP_SUCCESS,
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: authenticationConstants.AUTH_SIGNUP_ERROR,
        payload: { error },
      };
    }
  };
}

function googleLogin(props: {
  accessToken?: string;
  credential?: string;
  navigate?: NavigateFunction;
}) {
  const { accessToken, credential, navigate } = props;

  return (dispatch: TypedDispatch) => {
    dispatch(request());
    authService
      .googleLogin({ accessToken, credential })
      .then((response) => {
        tokenUtils.saveAccessToken(response.accessToken);
        tokenUtils.saveRefreshToken(response.refreshToken);

        dispatch(success());
        dispatch(check());
        dispatch(alertActions.add("success", "Login successfully !!!"));

        if (navigate) navigate("/");
      })
      .catch((err) => {
        dispatch(error(err));
        dispatch(alertActions.add("error", err));
      });

    function request() {
      return {
        type: authenticationConstants.AUTH_LOGIN_REQUEST,
      };
    }

    function success(): ReduxAction {
      return {
        type: authenticationConstants.AUTH_GOOGLE_LOGIN_REQUEST,
      };
    }

    function error(error: string): ReduxAction {
      return {
        type: authenticationConstants.AUTH_GOOGLE_LOGIN_ERROR,
        payload: { error },
      };
    }
  };
}
