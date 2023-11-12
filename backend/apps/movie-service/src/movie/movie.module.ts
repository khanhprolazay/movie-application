import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie, Service } from "@app/shared";
import { MovieRepository } from "./movie.repository";
import { GenreModule } from "../genre/genre.module";

@Module({
  imports: [TypeOrmModule.forFeature([Movie], Service.MOVIE), GenreModule],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
})
export class MovieModule{};