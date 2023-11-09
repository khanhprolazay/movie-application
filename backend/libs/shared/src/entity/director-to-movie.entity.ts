import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base";
import { Actor } from "./actor.entity";
import { Movie } from "./movie.entity";

@Entity({name: "director_to_movie"})
export class DirectorToMovie extends BaseEntity {
  @Column()
  actorId: number

  @Column()
  movieId: number

  @ManyToOne(() => Actor, (actor) => actor.directingMovies)
  actor: Actor

  @ManyToOne(() => Movie, (movie) => movie.directors)
  movie: Movie
}