import { Column, Entity, ManyToOne } from "typeorm";
import { ActorEntity } from "./actor.entity";
import { BaseEntity } from "../base";

@Entity({name: "quote"})
export class QuoteEntity extends BaseEntity {
  @Column('text')
  content: string

  @ManyToOne(() => ActorEntity, (actor) => actor.quotes)
  actor: ActorEntity
}