import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginRequestDto {
  @IsEmail()
  email: string

  @IsString() 
  password: string
}

export class LoginResonseDto {
  @IsString()
  accessToken: string

  @IsString()
  refreshToken: string
}

export class RegisterRequestDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  rePassword: string
}

export class ValidateDto {
  @IsString()
  @IsNotEmpty()
  token: string
}