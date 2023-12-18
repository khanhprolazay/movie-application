import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Genre, Movie, PatternOption, Service } from "@app/shared";
import { BaseMessageService } from "../base";
import { first } from "rxjs";

@Injectable()
export class MovieService extends BaseMessageService<Movie> {
  constructor(
    @Inject(Service.MOVIE) 
    protected readonly movieClient: ClientProxy
  ) {
    super(movieClient, "MOVIE");
  }

  getByYear(year: number, skip: number, limit: number) {
    return this.executeMany(PatternOption["MOVIE.GET.BY_YEAR"], { skip, limit, year });
  }

  getByRating(skip: number, limit: number) {
    return this.executeMany(PatternOption["MOVIE.GET.BY_RATING"], { skip, limit });
  }

  getByGenres(genres: string[], skip: number, limit: number) {
    return this.executeMany(PatternOption["MOVIE.GET.BY_GENRES"], { genres, skip, limit });
  }

  getByDay(skip: number, limit: number) {
    return this.executeMany(PatternOption["MOVIE.GET.BY_DAY"], { skip, limit });
  }

  getGenres() {
    return this.executeMany<Genre>(PatternOption["GENRE.GET.ALL"], {});
  }

  getByUpcoming(skip: number, limit: number) {
    return this.executeMany(PatternOption["MOVIE.GET.BY_UPCOMING"], { skip, limit });
  }

  getByRadomBackdrop() {
    return this.executeMany(PatternOption["MOVIE.GET.BY_RANDOM_BACKDROP"], {});
  }

  getByRandom() {
    return this.executeMany(PatternOption["MOVIE.GET.BY_RANDOM"], {});
  }

  getBySearch(search: string, skip, limit) {
    return this.executeMany(PatternOption["MOVIE.GET.BY_SEARCH"], { search, skip, limit });
  }

  getByRecommend(imdbId: string) {
    return this.movieClient.send<Movie[]>(PatternOption["MOVIE.GET.BY_RECOMMENDATION"], imdbId).pipe(first());
  }
}