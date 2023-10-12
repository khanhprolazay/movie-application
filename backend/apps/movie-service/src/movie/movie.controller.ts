import { Controller } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PatternOption } from "@app/shared";
import { PaginationDTO } from "../dto/movie.dto";

@Controller()
export class MovieController{
  constructor(
    private readonly movieService: MovieService
  ) {}

  @MessagePattern(PatternOption["MOVIE.GET_BY_ID"])
  async getMovieById(@Payload() id: number) {
    return await this.movieService.getById(id);
  }

  @MessagePattern(PatternOption["MOVIE.GET_BY_PAGINATION"])
  async getMovieByPagination(@Payload() dto: PaginationDTO) {
    return this.movieService.getByPagination(dto.skip, dto.limit);
  }
}