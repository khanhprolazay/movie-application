import { User } from "@/type";
import { axiosClient } from "./axios-client";

class UserService {
  getById(id: string): Promise<User> {
    return axiosClient.get(`/user/${id}`);
  }

  getProfile(): Promise<User> {
    return axiosClient.get("/user");
  }
}

const userService = new UserService();
export default userService;
