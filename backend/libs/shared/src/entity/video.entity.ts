import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";
import { BaseEntity } from "../base";

@Entity({name: "video"})
export class Video extends BaseEntity {
  @Column()
  name: string

  @Column({length: 30})
  key: string

  @Column({length: 20})
  site: string

  @Column()
  size: number

  @Column()
  type: string

  @Column()
  official: boolean

  @ManyToOne(() => Movie, movie => movie.videos)
  movie: Movie
}