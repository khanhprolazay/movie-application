import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { ActorToMovie } from "./actor-to-movie.entity";
import { QuoteEntity } from "./quote.entity";
import { TrademarkEntity } from "./trademark.entity";
import { TriviaEntity } from "./trivia.entity";
import { BaseEntity } from "../base";
import { AwardEntity } from "./award.entity";
import { BioEntity } from "./bio.entity";
import { text } from "stream/consumers";

@Entity({name: "actor"})
export class ActorEntity extends BaseEntity {
  @Column({unique: true})
  imdbId: string

  @Column()
  name: string

  @Column({nullable: true})
  imageUrl: string

  @Column({type: 'date', nullable: true})
  birthDay: Date

  @Column({ nullable: true })
  birthPlace: string

  @Column({ type: 'text', nullable: true })
  partialBio: string

  @Column({nullable: true})
  height: string

  // @OneToMany(() => ActorToMovie, actorToMovie => actorToMovie.actor)
  // actorToMovies: ActorToMovie[]
  @OneToMany(() => ActorToMovie, actorToMovie => actorToMovie.actor)
  movies: ActorToMovie[]

  @OneToMany(() => QuoteEntity, (quote) => quote.actor)
  quotes: QuoteEntity[]

  @OneToMany(() => TrademarkEntity, (trademark) => trademark.actor)
  trademarks: TrademarkEntity[]

  @OneToMany(() => TriviaEntity, (trivia) => trivia.actor)
  trivias: TriviaEntity[]

  @OneToMany(() => AwardEntity, award => award.actor)
  awards: AwardEntity[]

  @OneToOne(() => BioEntity)
  @JoinColumn()
  bio: BioEntity  
}