import { Column, Entity, ManyToOne } from "typeorm";
import { Movie } from "./movie.entity";
import { BaseEntity } from "../base";

@Entity({name: "trailer"})
export class Trailer extends BaseEntity {
  @Column()
  imdbId: string

  @Column()
  type: string

  @ManyToOne(() => Movie, movie => movie.trailers)
  movie: Movie
}