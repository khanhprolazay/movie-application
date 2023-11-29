import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Actor } from "./actor.entity";
import { Movie } from "./movie.entity";

@Entity({name: "director_to_movie"})
export class DirectorToMovie {
  @Column()
  @PrimaryColumn()
  actorId: number

  @Column()
  @PrimaryColumn()
  movieId: number

  @ManyToOne(() => Actor, (actor) => actor.directingMovies)
  actor: Actor

  @ManyToOne(() => Movie, (movie) => movie.directors)
  movie: Movie
}