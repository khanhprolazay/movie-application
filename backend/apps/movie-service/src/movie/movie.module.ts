import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "@app/shared";
import { MovieRepository } from "./movie.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
})
export class MovieModule{};