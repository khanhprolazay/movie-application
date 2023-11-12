import { Column, Entity, OneToMany, Unique } from "typeorm";
import { IsString } from "class-validator";
import { BaseEntity } from "../base";
import { MovieToGenre } from "./movie-to-genre.entity";

@Entity({name: "genre"})
export class Genre extends BaseEntity {
  @Column({ unique: true })
  @IsString()
  name: string

  @OneToMany(() => MovieToGenre, movieToGenre => movieToGenre.genre)
  movies: MovieToGenre[]
}