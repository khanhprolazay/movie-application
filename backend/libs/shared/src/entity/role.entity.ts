import { BaseEntity } from "../base";
import { Column, Entity, OneToMany } from "typeorm";
import { IsString } from "class-validator";
import { User } from "./user.entity";
import { RoleEnum } from "../constant";

@Entity({name: 'role'})
export class Role extends BaseEntity {
  @IsString()
  @Column({
    type: 'enum',
    enum: RoleEnum,
    unique: true,
    default: RoleEnum.USER,
  })
  name: RoleEnum

  @OneToMany(() => User, (user) => user.role)
  users: User[]
}