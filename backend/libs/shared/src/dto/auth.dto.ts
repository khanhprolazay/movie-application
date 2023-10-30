import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { UserLoginType } from "../constant";
import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
  @IsEmail()
  @ApiProperty()
  readonly email: string

  @IsString() 
  @ApiProperty()
  readonly password: string
}

export class LoginResonseDto {
  @IsString()
  readonly accessToken: string

  @IsString()
  readonly refreshToken: string
}

export class RegisterRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string

  @IsStrongPassword()
  @ApiProperty()
  readonly password: string

  @IsStrongPassword()
  @ApiProperty()
  readonly rePassword: string
}

export class RegisterGoogleRequestDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  readonly firstName: string

  @IsString()
  readonly lastName: string

  @IsString()
  @IsNotEmpty()
  readonly avatar: string

  @IsEnum(UserLoginType)
  @IsNotEmpty()
  readonly loginType: UserLoginType;
}

export class ValidateDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string
}

export class LoginGoogleRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly accessToken: string
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string
}

export interface GoogleResponseDto  {
  id: string,
  email: string,
  given_name: string,
  family_name: string,
  picture: string
}