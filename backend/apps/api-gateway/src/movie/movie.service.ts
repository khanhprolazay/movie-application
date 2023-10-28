import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { GenreEntity, MovieEntity, PatternOption, Service } from "@app/shared";
import { BaseMessageService } from "../base";

@Injectable()
export class MovieService extends BaseMessageService<MovieEntity> {
  constructor(
    @Inject(Service.MOVIE) protected readonly movieClient: ClientKafka,
  ) {
    super(movieClient, "MOVIE");
  }

  async getByYear(year: number, skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET_BY_YEAR"], { skip, limit, year });
  }

  async getByRating(skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET_BY_RATING"], { skip, limit });
  }

  async getByGenres(genres: string[], skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET_BY_GENRES"], { genres, skip, limit });
  }

  async getByDay(skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIES.GET_BY_DAY"], { skip, limit });
  }

  async getGenres() {
    return await this.executeMany<GenreEntity>(PatternOption["GENRE.GET_ALL"], {});
  }
}