import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";
import { Genre } from "./genre.entity";

@Entity({name: "movie_to_genre"})
export class MovieToGenre {
  @Column()
  @PrimaryColumn()
  movieId: number

  @Column()
  @PrimaryColumn()
  genreId: number

  @ManyToOne(() => Movie, movie => movie.genres)
  movie: Movie

  @ManyToOne(() => Genre, genre => genre.movies)
  genre: Genre
}