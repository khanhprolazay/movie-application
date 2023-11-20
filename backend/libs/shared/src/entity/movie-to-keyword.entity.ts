import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";
import { Keyword } from "./keyword.entity";

@Entity({name: "movie_to_keyword"})
export class MovieToKeyword {
  @Column()
  @PrimaryColumn()
  movieId: number

  @Column()
  @PrimaryColumn()
  keywordId: number

  @ManyToOne(() => Movie, movie => movie.keywords)
  movie: Movie

  @ManyToOne(() => Keyword, keyword => keyword.movies)
  keyword: Keyword
}