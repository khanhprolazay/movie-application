import { User } from "@/type";
import axios from "axios";
import { axiosClient } from "./axiosClient";

class UserApis {
  async getById(id: string): Promise<User> {
    return await axiosClient.get(`/user/${id}`);
  }
  
  async getProfile(): Promise<User> {
    return await axiosClient.get("/user");
  }
  
  async refreshToken(refreshToken: string): Promise<string> {
    return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/refreshToken/${refreshToken}`);
  }
  
  checkToken() {}
}

const userApis = new UserApis();
export default userApis;



  
