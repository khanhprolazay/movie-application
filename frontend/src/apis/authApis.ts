import { LoginDTO, LoginResponseDto, RegisterDTO } from "@/type";
import { axiosClient } from "./axiosClient";
import axios from "axios";

class AuthApis {
  async login(values: LoginDTO): Promise<LoginResponseDto> {
    return await axiosClient.post("/auth/login", { ...values });
  }

  async register(values: RegisterDTO) {
    return await axiosClient.post("/auth/register", { ...values });
  }

  async googleLogin(accessToken: string): Promise<LoginResponseDto> {
    return await axiosClient.post("/auth/google", { accessToken });
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string } | null> {
    try {
      return (await axios.post(`${import.meta.env.VITE_SERVER_HOST}/auth/refreshToken`, { refreshToken })).data;
    } catch {
      return null;
    }
  }
}

const authApis = new AuthApis();
export default authApis;