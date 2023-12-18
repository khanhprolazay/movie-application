import { LoginDTO, LoginResponseDto, RegisterDTO } from "@/type";
import { axiosClient } from "./axios-client";
import axios from "axios";

class AuthService {
  login(values: LoginDTO): Promise<LoginResponseDto> {
    return axiosClient.post("/auth/login", { ...values });
  }

  register(values: RegisterDTO) {
    return axiosClient.post("/auth/register", { ...values });
  }

  googleLogin(props: {
    accessToken?: string;
    credential?: string;
  }): Promise<LoginResponseDto> {
    const { accessToken, credential } = props;
    return axiosClient.post("/auth/google/callback", {
      accessToken,
      credential,
    });
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string } | null> {
    try {
      return (
        await axios.post(
          `${import.meta.env.VITE_SERVER_HOST}/auth/refreshToken`,
          { refreshToken },
        )
      ).data;
    } catch {
      return null;
    }
  }
}

const authsService = new AuthService();
export default authsService;
