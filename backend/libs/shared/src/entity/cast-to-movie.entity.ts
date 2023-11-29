import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Actor } from "./actor.entity";
import { Movie } from "./movie.entity";

@Entity({name: "cast_to_movie"})
export class CastToMovie {
  @Column()
  @PrimaryColumn()
  actorId: number

  @Column()
  @PrimaryColumn()
  movieId: number

  @Column()
  role: string

  @ManyToOne(() => Actor, (actor) => actor.castingMovies)
  actor: Actor

  @ManyToOne(() => Movie, (movie) => movie.casts)
  movie: Movie
}