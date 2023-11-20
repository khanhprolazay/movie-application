import { Controller, DefaultValuePipe, Get, Inject, OnModuleInit, Param, ParseArrayPipe, ParseIntPipe, Query, UseInterceptors } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { Pattern, Service } from "@app/shared";
import { ClientKafka } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller("movies")
@ApiTags("Movie")
export class MovieController {
  constructor( private readonly movieService: MovieService ) {}

  // async onModuleInit() {
  //   const patterns: Pattern[] = ["MOVIE.GET.BY_ID", "MOVIE.GET.BY_YEAR", "GENRE.GET.ALL", "MOVIE.GET.BY_RATING", "MOVIE.GET.BY_GENRES", "MOVIE.GET.BY_DAY", "MOVIE.GET.BY_SEARCH", "MOVIE.GET.BY_UPCOMING"];
  //   patterns.forEach(pattenrn => this.movieClient.subscribeToResponseOf(pattenrn));
  //   await this.movieClient.connect();
  // }

  @Get("byYear")
  @UseInterceptors(CacheInterceptor)
  async getByYear(
    @Query("year", ParseIntPipe) year: number,
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return await this.movieService.getByYear(year, skip, limit);
  }

  @Get("byGenres")
  @UseInterceptors(CacheInterceptor)
  async getByGenres(
    @Query("genres", new ParseArrayPipe({ items: String, separator: ","})) genres: string[],
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return await this.movieService.getByGenres(genres, skip, limit);
  }

  @Get("byRating")
  @UseInterceptors(CacheInterceptor)
  async getByRating(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return await this.movieService.getByRating(skip, limit);
  }

  @Get("byDay")
  @UseInterceptors(CacheInterceptor)
  async getByDay(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return await this.movieService.getByDay(skip, limit);
  }

  @Get("bySearch")
  @UseInterceptors(CacheInterceptor)
  async getBySearch(
    @Query("search") search: string,
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.movieService.getBySearch(search,  skip, limit);
  }

  @Get("byUpcoming")
  @UseInterceptors(CacheInterceptor)
  async getUpcoming(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.movieService.getByUpcoming(skip, limit);
  }

  @Get("byId/:id") 
  async getMovieById(@Param("id", ParseIntPipe) id: number) {
    return await this.movieService.getById(id);
  }

  @Get("genres")
  @UseInterceptors(CacheInterceptor)
  async getGenres() {
    return await this.movieService.getGenres();
  }
}