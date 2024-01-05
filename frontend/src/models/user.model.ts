export type Sex = "MALE" | "FEMALE";

export interface User {
  id: number,
  firstName?: string,
  lastName?: string,
  email: string,
  sex: Sex,
  phone?: string,
  avatar: string,
}

export interface UpdatePasswordDto {
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
}