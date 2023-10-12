import { BaseEntity } from "../base";
import { Column, Entity, OneToMany } from "typeorm";
import { IsString } from "class-validator";
import { UserEntity } from "./user.entity";
import { Role } from "../constant";

@Entity({name: 'role'})
export class RoleEntity extends BaseEntity {
  @IsString()
  @Column({
    type: 'enum',
    enum: Role,
    unique: true,
    default: Role.USER,
  })
  name: Role

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[]
}