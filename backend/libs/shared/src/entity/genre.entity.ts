import { Column, Entity, Unique } from "typeorm";
import { IsString } from "class-validator";
import { BaseEntity } from "../base";

@Entity({name: "genre"})
export class Genre extends BaseEntity {
  @Column({ unique: true })
  @IsString()
  name: string
}