import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base";

@Entity() 
export class WorldwideGross extends BaseEntity {
  @Column()
  amount: number

  @Column()
  currency: string
}