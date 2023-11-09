import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntity } from "../base"
import { Movie } from "./movie.entity"
import { Actor } from "./actor.entity"

@Entity({name: "writer_to_movie"})
export class WriterToMovie extends BaseEntity {
  @Column()
  actorId: number

  @Column()
  movieId: number

  @ManyToOne(() => Actor, (actor) => actor.writingMovies)
  actor: Actor

  @ManyToOne(() => Movie, (movie) => movie.writers)
  movie: Movie
}