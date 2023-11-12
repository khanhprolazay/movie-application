import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base";
import { Movie } from "./movie.entity";
import { Genre } from "./genre.entity";

@Entity({name: "movie_to_genre"})
export class MovieToGenre extends BaseEntity {
  @Column()
  movieId: number

  @Column()
  genreId: number

  @ManyToOne(() => Movie, movie => movie.genres)
  movie: Movie

  @ManyToOne(() => Genre, genre => genre.movies)
  genre: Genre
}