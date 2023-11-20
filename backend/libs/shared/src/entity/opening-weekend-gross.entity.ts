import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Budget } from "./budget.entity";

@Entity() 
export class OpeningWeekendGross {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Budget)
  @JoinColumn()
  budget: Budget;

  @Column()
  weekendEndDate: Date;
}