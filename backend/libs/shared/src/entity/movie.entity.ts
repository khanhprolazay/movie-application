import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Genre } from "./genre.entity";
import { ActorToMovie } from "./actor-to-movie.entity";
import { BaseEntity } from "../base";
import { Trailer } from "./trailer.entity";

@Entity({name: "movie"})
export class Movie extends BaseEntity {
  @Column({ unique: true, length: '20' })
  imdbId: string

  @Column({ length: 100 })
  title: string

  @Column({type: "double", nullable: true})
  rating: number

  @Column({ type: "int", nullable: true})
  voteCount: number

  @Column({ type: "double", nullable: true })
  movieLength: number

  @Column({ type: "text", nullable: true })
  imageUrl: string

  @Column({type: 'date', nullable: true})
  release: Date

  @Column({ type: 'text', nullable: true })
  plot: string

  @Column({type: 'text', nullable: true})
  description: string

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[]

  @OneToMany(() => ActorToMovie, actorToMovie => actorToMovie.movie)
  actors: ActorToMovie[]

  @OneToMany(() => Trailer, trailer => trailer.movie)
  trailers: Trailer[]
}