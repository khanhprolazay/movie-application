import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base";
import { Budget } from "./budget.entity";

@Entity()
export class Currency extends BaseEntity {
  @Column({ length: 3, unique: true })
  code: string;

  @OneToMany(() => Budget, budget => budget.currency)
  budgets: Budget[];
}