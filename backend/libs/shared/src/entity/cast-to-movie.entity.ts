import { Column, Entity, ManyToOne } from "typeorm";
import { Actor } from "./actor.entity";
import { Movie } from "./movie.entity";
import { BaseEntity } from "../base";

@Entity({name: "cast_to_movie"})
export class CastToMovie extends BaseEntity {
  @Column()
  actorId: number

  @Column()
  movieId: number

  @Column()
  role: string

  @ManyToOne(() => Actor, (actor) => actor.castingMovies)
  actor: Actor

  @ManyToOne(() => Movie, (movie) => movie.casts)
  movie: Movie
}