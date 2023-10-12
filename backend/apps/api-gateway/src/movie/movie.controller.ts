import { Controller, DefaultValuePipe, Get, Inject, OnModuleInit, Param, ParseIntPipe, Query } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { Pattern, Service } from "@app/shared";
import { ClientKafka } from "@nestjs/microservices";

@Controller("movies")
export class MovieController implements OnModuleInit {
  constructor( 
    @Inject(Service.MOVIE) 
    private readonly movieClient: ClientKafka, 
    private readonly movieService: MovieService,
  ) {}

  async onModuleInit() {
    const patterns: Pattern[] = ["MOVIE.GET_BY_ID", "MOVIE.GET_BY_PAGINATION", "GENRE.GET_ALL"];
    patterns.forEach(pattenrn => this.movieClient.subscribeToResponseOf(pattenrn));
    await this.movieClient.connect();
  }

  @Get()
  async getMovieByPagination(
    @Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number, 
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number) {
    return await this.movieService.getMovieByPagination(skip, limit);
  }

  @Get(":id")
  async getMovieById(@Param("id", ParseIntPipe) id: number) {
    return await this.movieService.getById(id);
  }

  @Get("genres/get")
  async getGenres() {
    return await this.movieService.getGenres();
  }
}