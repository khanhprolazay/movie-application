import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "../base"
import { Movie } from "./movie.entity"
import { Actor } from "./actor.entity"

@Entity({name: "writer_to_movie"})
export class WriterToMovie {
  @Column()
  @PrimaryColumn()
  actorId: number

  @Column()
  @PrimaryColumn()
  movieId: number

  @ManyToOne(() => Actor, (actor) => actor.writingMovies)
  actor: Actor

  @ManyToOne(() => Movie, (movie) => movie.writers)
  movie: Movie
}