import { Column, Entity, OneToMany } from "typeorm";
import { ActorToMovie } from "./actor-to-movie.entity";
import { BaseEntity } from "../base";

@Entity({name: "actor"})
export class Actor extends BaseEntity {
  @Column({unique: true})
  imdbId: string

  @Column()
  name: string

  @Column({type: "text", nullable: true})
  imageUrl: string

  @Column({type: 'date', nullable: true})
  birthDay: Date

  @Column({ nullable: true })
  birthPlace: string

  @Column({ type: 'text', nullable: true })
  partialBio: string

  @Column({nullable: true})
  height: string

  @OneToMany(() => ActorToMovie, actorToMovie => actorToMovie.actor)
  movies: ActorToMovie[]
}