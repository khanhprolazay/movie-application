export type RegisterDTO = {
  email: string,
  password: string,
  rePassword: string
}

export type LoginDTO = {
  email: string,
  password: string,
}

export type LoginResponseDto = {
  accessToken: string,
  refreshToken: string,
}