import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base";

@Entity() 
export class OpeningWeekendGross extends BaseEntity {
  @Column()
  amount: number

  @Column()
  currency: string

  @Column()
  weekendEndDate: Date
}