import { Entity, Column, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../base';
import { MovieToKeyword } from './movie-to-keyword.entity';

@Entity()
export class Keyword extends BaseEntity {
  @Column({length: 50, unique: true})
  @Index()
  name: string;

  @OneToMany(() => MovieToKeyword, movieToKeyword => movieToKeyword.keyword)
  movies: MovieToKeyword[];
}
