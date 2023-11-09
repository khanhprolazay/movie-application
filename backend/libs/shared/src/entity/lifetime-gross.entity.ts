import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../base";
import { Movie } from "./movie.entity";

@Entity() 
export class LifetimeGross extends BaseEntity {
  @Column()
  amount: number

  @Column()
  currency: string
}