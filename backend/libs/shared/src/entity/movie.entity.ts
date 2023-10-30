import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { GenreEntity } from "./genre.entity";
import { ActorToMovie } from "./actor-to-movie.entity";
import { BaseEntity } from "../base";
import { AwardEntity } from "./award.entity";

@Entity({name: "movie"})
export class MovieEntity extends BaseEntity {
  @Column({ unique: true, length: '20' })
  imdbId: string

  @Column({ length: 100 })
  title: string

  @Column('text')
  description: string

  @Column('double')
  movieLength: number

  @Column('double')
  rating: number

  @Column({ nullable: true })
  trailer: string

  @Column({ nullable: true })
  imageUrl: string

  @Column({type: 'date', nullable: true})
  release: Date

  @Column({ type: 'text', nullable: true })
  plot: string

  @Column({ nullable: true })
  banner: string

  @ManyToMany(() => GenreEntity)
  @JoinTable()
  genres: GenreEntity[]

  @OneToMany(() => ActorToMovie, actorToMovie => actorToMovie.movie)
  actors: ActorToMovie[]

  @OneToMany(() => AwardEntity, award => award.movie)
  awards: AwardEntity[]

}