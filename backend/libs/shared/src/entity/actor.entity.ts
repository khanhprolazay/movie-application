import { Column, Entity, OneToMany } from "typeorm";
import { CastToMovie } from "./cast-to-movie.entity";
import { BaseEntity } from "../base";
import { WriterToMovie } from "./writer-to-movie.entity";
import { DirectorToMovie } from "./director-to-movie.entity";

@Entity({name: "actor"})
export class Actor extends BaseEntity {
  @Column({unique: true})
  imdbId: string

  @Column()
  name: string

  @Column({type: "text", nullable: true})
  imageUrl: string

  @Column({type: 'date', nullable: true})
  birthDay: Date

  @Column({ nullable: true })
  birthPlace: string

  @Column({ type: 'text', nullable: true })
  partialBio: string

  @Column({nullable: true})
  height: string

  @OneToMany(() => CastToMovie, castToMovie => castToMovie.actor)
  castingMovies: CastToMovie[]

  @OneToMany(() => WriterToMovie, writerToMovie => writerToMovie.actor)
  writingMovies: WriterToMovie[]

  @OneToMany(() => DirectorToMovie, directorToMovie => directorToMovie.actor)
  directingMovies: DirectorToMovie[]
}