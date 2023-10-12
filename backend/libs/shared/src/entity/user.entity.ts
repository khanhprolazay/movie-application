import { hash } from "argon2";
import { BaseEntity } from "../base";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from "typeorm";
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Exclude } from "class-transformer";
import { RoleEntity } from "./role.entity";
import { Sex } from "../constant/sex.enum";

@Entity({name: 'user'})
export class UserEntity extends BaseEntity {
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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password);
  }

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity
}