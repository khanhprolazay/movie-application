import { User } from "@/type";
import { axiosClient } from "./axiosClient";

class UserApis {
  async getById(id: string): Promise<User> {
    return await axiosClient.get(`/user/${id}`);
  }
  
  async getProfile(): Promise<User> {
    return await axiosClient.get("/user");
  }
}

const userApis = new UserApis();
export default userApis;



  
