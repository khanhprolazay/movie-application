import { Column, Entity, ManyToOne } from "typeorm";
import { ActorEntity } from "./actor.entity";
import { BaseEntity } from "../base";

@Entity({name: "trivia"})
export class TriviaEntity extends BaseEntity {
  @Column('text')
  content: string

  @ManyToOne(() => ActorEntity, (actor) => actor.quotes)
  actor: ActorEntity
}