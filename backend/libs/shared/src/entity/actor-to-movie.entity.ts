import { Column, Entity, ManyToOne } from "typeorm";
import { ActorEntity } from "./actor.entity";
import { MovieEntity } from "./movie.entity";
import { BaseEntity } from "../base";

@Entity({name: "actor_to_movie"})
export class ActorToMovie extends BaseEntity {
  @Column()
  actorId: number

  @Column()
  movieId: number

  @Column()
  role: string

  @ManyToOne(() => ActorEntity, (actor) => actor.movies)
  actor: ActorEntity

  // @ManyToOne(() => MovieEntity, (movie) => movie.actorToMovies)
  // movie: MovieEntity
  @ManyToOne(() => MovieEntity, (movie) => movie.actors)
  movie: MovieEntity
}