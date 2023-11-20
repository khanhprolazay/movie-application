import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";

@Entity({name: "trailer"})
export class Trailer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  imdbId: string

  @Column()
  type: string

  @ManyToOne(() => Movie, movie => movie.trailers)
  movie: Movie
}