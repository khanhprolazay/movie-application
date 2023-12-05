import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka, ClientProxy } from "@nestjs/microservices";
import { Genre, Movie, PatternOption, Service } from "@app/shared";
import { BaseMessageService } from "../base";

@Injectable()
export class MovieService extends BaseMessageService<Movie> {
  constructor(
    @Inject(Service.MOVIE) 
    protected readonly movieClient: ClientProxy,
  ) {
    super(movieClient, "MOVIE");
  }

  async getByYear(year: number, skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET.BY_YEAR"], { skip, limit, year });
  }

  async getByRating(skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET.BY_RATING"], { skip, limit });
  }

  async getByGenres(genres: string[], skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET.BY_GENRES"], { genres, skip, limit });
  }

  async getByDay(skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET.BY_DAY"], { skip, limit });
  }

  async getGenres() {
    return await this.executeMany<Genre>(PatternOption["GENRE.GET.ALL"], {});
  }

  async getByUpcoming(skip: number, limit: number) {
    return await this.executeMany(PatternOption["MOVIE.GET.BY_UPCOMING"], { skip, limit });
  }

  async getByRadomBackdrop() {
    return await this.executeMany(PatternOption["MOVIE.GET.BY_RANDOM_BACKDROP"], {});
  }

  async getByRandom() {
    return await this.executeMany(PatternOption["MOVIE.GET.BY_RANDOM"], {});
  }

  async getBySearch(search: string, skip, limit) {
    return await this.executeMany(PatternOption["MOVIE.GET.BY_SEARCH"], { search, skip, limit });
  }


}