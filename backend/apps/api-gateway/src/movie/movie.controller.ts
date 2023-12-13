import { Controller, DefaultValuePipe, Get, Inject, OnModuleInit, Param, ParseArrayPipe, ParseIntPipe, Query, UseInterceptors } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { ApiTags } from "@nestjs/swagger";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

@Controller("movies")
@ApiTags("Movie")
export class MovieController {
  constructor( private readonly movieService: MovieService ) {}

  @Get("byYear")
  @UseInterceptors(CacheInterceptor)
  getByYear(
    @Query("year", ParseIntPipe) year: number,
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return this.movieService.getByYear(year, skip, limit);
  }

  @Get("byRecommend")
  @UseInterceptors(CacheInterceptor)
  getByRecommend(@Query("imdbId") imdbId: string) {
    return this.movieService.getByRecommend(imdbId);
  }

  @Get("byGenres")
  @UseInterceptors(CacheInterceptor)
  getByGenres(
    @Query("genres", new ParseArrayPipe({ items: String, separator: ","})) genres: string[],
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return this.movieService.getByGenres(genres, skip, limit);
  }

  @Get("byRating")
  @UseInterceptors(CacheInterceptor)
  getByRating(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return this.movieService.getByRating(skip, limit);
  }

  @Get("byDay")
  @UseInterceptors(CacheInterceptor)
  getByDay(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return this.movieService.getByDay(skip, limit);
  }

  @Get("bySearch")
  @UseInterceptors(CacheInterceptor)
  getBySearch(
    @Query("search") search: string,
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.movieService.getBySearch(search,  skip, limit);
  }

  @Get("byUpcoming")
  @UseInterceptors(CacheInterceptor)
  getUpcoming(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.movieService.getByUpcoming(skip, limit);
  }

  @Get("byRandomBackdrop")
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(24 * 60 * 60 * 1000) // 1 day
  getByRadomBackdrop() {
    return this.movieService.getByRadomBackdrop();
  }

  @Get("byRandom")
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(24 * 60 * 60 * 1000) // 1 day
  getByRadom() {
    return this.movieService.getByRandom();
  }

  @Get("byId/:id") 
  getMovieById(@Param("id", ParseIntPipe) id: number) {
    return this.movieService.getById(id);
  }

  @Get("genres")
  @UseInterceptors(CacheInterceptor)
  getGenres() {
    return this.movieService.getGenres();
  }
}