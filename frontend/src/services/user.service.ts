import { axiosClient } from "./axios-client";
import { UpdatePasswordDto, User } from "@/models";

class UserService {
  getById(id: string): Promise<User> {
    return axiosClient.get(`/user/${id}`);
  }

  getProfile(): Promise<User> {
    return axiosClient.get("/user");
  }

  updateProfile(user: Partial<User>): Promise<User> {
    return axiosClient.put("/user", user);
  }

  updatePassword(data: UpdatePasswordDto): Promise<void> {
    return axiosClient.put("/user/password", data);
  }
}

const userService = new UserService();
export default userService;
