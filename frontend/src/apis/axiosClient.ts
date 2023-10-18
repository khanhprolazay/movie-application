import axios from "axios";
import authApis from "./authApis";
import store from "@/redux/store";
import tokenUtils from "@/utils/tokenUtils";
import authenticationActions from "@/actions/authentication.action";
import alertActions from "@/actions/alert.action";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST,
  headers: {
    'content-type': 'application/json',
  }
});

let refreshTokenRequest: typeof authApis.refreshToken | null = null;
axiosClient.interceptors.request.use(
  async (config: any) => {
    const accessToken = tokenUtils.getAccessToken();
    const refreshToken = tokenUtils.getRefreshToken();

    if (!accessToken) {
      return config;
    }

    if (!tokenUtils.checkExpried(accessToken)) {
      return tokenUtils.addTokenToConfig(config, accessToken);
    }

    if (refreshToken) {
      refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : authApis.refreshToken;
      const response = await refreshTokenRequest(refreshToken);

      refreshTokenRequest = null;

      // If there is no response => Refresh token expried
      if (!response) {
        store.dispatch(alertActions.add("error", "Your login session expried. Please login again !!!") as any);
        store.dispatch(authenticationActions.logout() as any);
        return config; 
      }

      console.log(response)
      tokenUtils.saveAccessToken(response.accessToken);
      return tokenUtils.addTokenToConfig(config, response.accessToken);
    }

    return config;
},
  (error: any) => {
    return Promise.reject(error);
  }
)

axiosClient.interceptors.response.use(
  (response) => response.data ? response.data : response,
  (error) => {
    if (error.response?.data?.message) throw error.response.data.message;
    throw "Internal Server Error !!!";
  }
)