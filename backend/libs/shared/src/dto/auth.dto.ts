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
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  rePassword: string
}

export class RegisterGoogleRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  @IsNotEmpty()
  avatar: string
}

export class ValidateDto {
  @IsString()
  @IsNotEmpty()
  token: string
}

export class LoginGoogleRequestDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string
}