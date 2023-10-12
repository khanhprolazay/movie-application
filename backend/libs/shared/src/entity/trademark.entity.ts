import { Column, Entity, ManyToOne } from "typeorm";
import { ActorEntity } from "./actor.entity";
import { BaseEntity } from "../base";

@Entity({name: "trademark"})
export class TrademarkEntity extends BaseEntity {
  @Column('text')
  content: string

  @ManyToOne(() => ActorEntity, (actor) => actor.quotes)
  actor: ActorEntity
}