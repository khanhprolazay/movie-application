import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { Sex } from "../constant/sex.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDTO  {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly oldPassword: string

  @IsStrongPassword()
  @ApiProperty()
  readonly newPassword: string

  @IsStrongPassword()
  @ApiProperty()
  readonly confirmPassword: string
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string

  @IsEnum(Sex)
  @IsNotEmpty()
  @ApiProperty()
  readonly sex: Sex

  @IsPhoneNumber('VN')
  @ApiProperty()
  readonly phone: string
}