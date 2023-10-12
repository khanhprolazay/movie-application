import axios from "axios";
import userApis from "./userApis";
import tokenUtils from "@/utils/tokenUtils";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST,
  headers: {
    'content-type': 'application/json',
  }
});

let refreshTokenRequest: any = null;
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
      refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : userApis.refreshToken;
      const newToken = await refreshTokenRequest(refreshToken);

      refreshTokenRequest = null;
      localStorage.setItem("accessToken", newToken);

      return tokenUtils.addTokenToConfig(config, newToken);
    }

    return config;
},
  (error: any) => {
    console.log(error);
    return Promise.reject(error);
  }
)

axiosClient.interceptors.response.use(
  (response) => response.data ? response.data : response,
  (error) => {
    if (error.response.data?.message) throw error.response.data.message;
    throw "Internal Server Error !!!";
  }
)