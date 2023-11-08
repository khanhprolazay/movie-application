import { Column, Entity, ManyToOne } from "typeorm";
import { Actor } from "./actor.entity";
import { Movie } from "./movie.entity";
import { BaseEntity } from "../base";

@Entity({name: "actor_to_movie"})
export class ActorToMovie extends BaseEntity {
  @Column()
  actorId: number

  @Column()
  movieId: number

  @Column()
  role: string

  @ManyToOne(() => Actor, (actor) => actor.movies)
  actor: Actor

  // @ManyToOne(() => Movie, (movie) => movie.actorToMovies)
  // movie: Movie
  @ManyToOne(() => Movie, (movie) => movie.actors)
  movie: Movie
}