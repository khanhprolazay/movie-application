import { AxiosRequestConfig } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";

const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const saveAccessToken = (accessToken: string) => localStorage.setItem("accessToken", accessToken);
const saveRefreshToken = (refreshToken: string) => localStorage.setItem("refreshToken", refreshToken);

const clearToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

const checkExpried = (token: string) => {
  const payload = jwtDecode<JwtPayload>(token);
  return payload.exp ? payload.exp < Date.now() / 1000 : false;
}

const addTokenToConfig = (config: AxiosRequestConfig, token: string): AxiosRequestConfig => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: "Bearer " + token,
  },

})

const tokenUtils = { getAccessToken, getRefreshToken, clearToken, checkExpried, addTokenToConfig, saveAccessToken, saveRefreshToken };
export default tokenUtils;