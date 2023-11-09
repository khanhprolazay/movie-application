import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base";

@Entity() 
export class ProductionBudget extends BaseEntity {
  @Column()
  amount: number

  @Column()
  currency: string
}