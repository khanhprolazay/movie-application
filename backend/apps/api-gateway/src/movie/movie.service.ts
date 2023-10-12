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

  async getMovieByPagination(skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET_BY_PAGINATION"], { skip,  limit });
  }

  async getGenres() {
    return await this.executeMany<GenreEntity>(PatternOption["GENRE.GET_ALL"], {});
  }
}