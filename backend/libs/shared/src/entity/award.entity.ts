import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base";
import { ActorEntity } from "./actor.entity";
import { MovieEntity } from "./movie.entity";

@Entity({name: "awards"})
export class AwardEntity extends BaseEntity {

  @ManyToOne(() => ActorEntity, (actor) => actor.awards)
  actor: ActorEntity

  @ManyToOne(() => MovieEntity, (movie) => movie.awards)
  movie: MovieEntity

  @Column()
  eventName: string

  @Column('year')
  year: number

  @Column()
  type: string

  @Column()
  awardName: string

  @Column()
  award: string
}