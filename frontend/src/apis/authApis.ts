import { LoginDTO, LoginResponseDto, RegisterDTO } from "@/type";
import { axiosClient } from "./axiosClient";

class AuthApis {
  async login(values: LoginDTO): Promise<LoginResponseDto> {
    return await axiosClient.post("/auth/login", { ...values });
  }

  async register(values: RegisterDTO) {
    return await axiosClient.post("/auth/register", { ...values });
  }
}

const authApis = new AuthApis();
export default authApis;