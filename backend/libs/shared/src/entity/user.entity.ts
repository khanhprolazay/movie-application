import { BaseEntity } from "../base";
import { Column, Entity, ManyToOne } from "typeorm";
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Exclude } from "class-transformer";
import { Role } from "./role.entity";
import { Sex } from "../constant/sex.enum";
import { UserLoginType } from "../constant";

@Entity({name: 'user'})
export class User extends BaseEntity {
  @IsString()
  @IsOptional()
  @Column({name: 'first_name', nullable: true})
  firstName?: string

  @IsString()
  @IsOptional()
  @Column({name: 'last_name', nullable: true})
  lastName?: string

  @IsEmail()
  @Column({unique: true})
  email: string

  @IsEnum(Sex)
  @Column({ type: "enum", enum: Sex, default: Sex.MALE })
  sex: Sex

  @IsEnum(UserLoginType)
  @Column({type: "enum", enum: UserLoginType, default: UserLoginType.SYSTEM})
  loginType: UserLoginType

  @IsPhoneNumber()
  @Column({ nullable: true})
  phone?: string

  @IsString()
  @Column({ default: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" })
  avatar: string

  @IsString()
  @Exclude({ toPlainOnly: true })
  @Column({name: 'hash_password'})
  password: string

  @ManyToOne(() => Role, (role) => role.users)
  role: Role
}